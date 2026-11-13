"""End-to-end API checks against a disposable SQLite database; never targets a live store.
Run: python tests/api_smoke.py (requires .NET 10 SDK on PATH).
"""
import http.cookiejar
import base64
import sqlite3
import json
import os
from pathlib import Path
import secrets
import socket
import subprocess
import tempfile
import time
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
with socket.socket() as sock:
    sock.bind(('127.0.0.1', 0))
    port = sock.getsockname()[1]
BASE = f'http://127.0.0.1:{port}'
PASSWORD = secrets.token_urlsafe(22) + 'Aa1!'

class Client:
    def __init__(self):
        self.http = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
    def call(self, path, method='GET', data=None, csrf=True, content_type='application/json'):
        headers = {'Content-Type': content_type}
        if method != 'GET' and csrf:
            _, token = self.call('/auth/csrf')
            headers['X-CSRF-TOKEN'] = token['token']
        request = urllib.request.Request(BASE + '/api' + path, data=data if isinstance(data, bytes) else json.dumps(data).encode() if data is not None else None, headers=headers, method=method)
        try:
            response = self.http.open(request)
        except urllib.error.HTTPError as e:
            response = e
        body = response.read()
        return response.status, (json.loads(body) if 'application/json' in response.headers.get('Content-Type', '') else body) if body else None
    def expect(self, status, *args, **kwargs):
        actual, body = self.call(*args, **kwargs)
        assert actual == status, (args[0], status, actual, body)
        return body

with tempfile.TemporaryDirectory(prefix='sadhya-api-test-') as directory:
    env = dict(os.environ, ASPNETCORE_ENVIRONMENT='Development', ASPNETCORE_URLS=BASE,
               ConnectionStrings__Store=f'Data Source={directory}/test.db',
               BootstrapAdmin__Email='admin@example.test', BootstrapAdmin__Password=PASSWORD,
               Logging__LogLevel__Default='Warning', Authentication__Google__ClientId='test-client.apps.googleusercontent.com')
    with open(f'{directory}/server.log', 'w+') as log:
        process = subprocess.Popen([os.environ.get('DOTNET', 'dotnet'), 'run', '--no-build', '--project', str(ROOT / 'backend/Sadhya.Api')], env=env, stdout=log, stderr=log)
        try:
            guest, admin, customer, other = Client(), Client(), Client(), Client()
            for attempt in range(100):
                try:
                    if guest.call('/health')[0] == 200: break
                except OSError: pass
                if process.poll() is not None: raise RuntimeError('API exited before becoming ready')
                time.sleep(.1)
            else: raise RuntimeError('API failed to start')
            guest.expect(401, '/auth/me')
            guest.expect(401, '/admin/products')
            guest.expect(400, '/auth/login', 'POST', {'email':'admin@example.test','password':PASSWORD}, csrf=False)
            admin.expect(200, '/auth/login', 'POST', {'email':'admin@example.test','password':PASSWORD})
            assert admin.expect(200, '/auth/me')['isAdmin']
            for client, email, phone in [(customer, 'customer@example.test', '9000000001'), (other, 'other@example.test', '9000000002')]:
                client.expect(200, '/auth/register', 'POST', {'fullName':'Test Customer','email':email,'password':PASSWORD,'phoneNumber':phone})
                client.expect(200, '/auth/login', 'POST', {'email':email,'password':PASSWORD})
                assert not client.expect(200, '/auth/me')['isAdmin']
                client.expect(403, '/admin/products')
            assert guest.expect(200, '/auth/google/config')['enabled']
            guest.expect(401, '/auth/google', 'POST', {'credential':'not-a-google-token'})
            guest.expect(401, '/auth/google/link', 'POST', {'credential':'not-a-google-token'})
            guest.expect(400, '/auth/register', 'POST', {'fullName':'Missing phone','email':'missing@example.test','password':PASSWORD})
            guest.expect(409, '/auth/register', 'POST', {'fullName':'Duplicate phone','email':'duplicate@example.test','password':PASSWORD,'phoneNumber':'+91 90000 00001'})
            customer.expect(200, '/auth/login', 'POST', {'identifier':'+91 90000 00001','password':PASSWORD})
            assert customer.expect(200, '/auth/me')['phoneNumber'] == '9000000001'
            assert customer.expect(200, '/auth/me')['hasPassword']
            customer.expect(401, '/auth/login', 'POST', {'identifier':'9000000001','password':'wrong-password'})
            customer.expect(400, '/auth/phone', 'POST', {'phoneNumber':'9000000003','password':'wrong-password'})
            customer.expect(409, '/auth/phone', 'POST', {'phoneNumber':'9000000002','password':PASSWORD})
            customer.expect(200, '/auth/phone', 'POST', {'phoneNumber':'9000000003','password':PASSWORD})
            customer.expect(200, '/auth/login', 'POST', {'identifier':'9000000003','password':PASSWORD})
            assert not guest.expect(200, '/slides')['configured']
            guest.expect(401, '/admin/slides')
            customer.expect(403, '/admin/slides')
            slide = dict(id='20000000-0000-0000-0000-000000000001',image='/slides/Banner1.png',mobileImage='',alt='Test slide',isActive=True)
            customer.expect(403, '/admin/slides', 'PUT', [slide])
            admin.expect(400, '/admin/slides', 'PUT', [dict(slide,image='javascript:alert(1)')])
            admin.expect(200, '/admin/slides', 'PUT', [slide,dict(slide,id='20000000-0000-0000-0000-000000000002',isActive=False)])
            assert len(guest.expect(200, '/slides')['slides']) == 1
            assert len(admin.expect(200, '/admin/slides')['slides']) == 2
            edited = dict(slide,image='/updated.png',mobileImage='/mobile.png',alt='Updated banner')
            second = dict(slide,id='20000000-0000-0000-0000-000000000002',alt='Second banner')
            admin.expect(200, '/admin/slides', 'PUT', [second,edited])
            assert guest.expect(200, '/slides')['slides'][0]['alt'] == 'Second banner'
            assert guest.expect(200, '/slides')['slides'][1]['mobileImage'] == '/mobile.png'
            admin.expect(200, '/admin/slides', 'PUT', [])
            assert guest.expect(200, '/slides') == {'configured':True,'slides':[]}
            categories = guest.expect(200, '/categories')
            assert [c['name'] for c in categories] == ['Offer Zone','Dry Fruits','Nuts','Spices','Healthy Snacks','Dates','Seeds','Berries','Rice & Millets','Herbal Powders','Oils']
            customer.expect(403, '/admin/categories', 'POST', {'name':'Forbidden','image':'/test.jpg','sortOrder':12})
            new_category = admin.expect(200, '/admin/categories', 'POST', {'name':'Test collection','image':'/test.jpg','sortOrder':12})
            admin.expect(409, '/admin/categories', 'POST', {'name':'test collection','image':'/test.jpg','sortOrder':12})
            admin.expect(200, '/admin/categories/' + str(new_category['id']), 'PUT', {'name':'Edited collection','image':'/updated.jpg','sortOrder':13})
            admin.expect(204, '/admin/categories/' + str(new_category['id']), 'DELETE')
            boundary = 'SadhyaSmokeBoundary'
            def multipart(data):
                return ('--' + boundary + '\r\nContent-Disposition: form-data; name="file"; filename="test.png"\r\nContent-Type: image/png\r\n\r\n').encode() + data + ('\r\n--' + boundary + '--\r\n').encode()
            png = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=')
            upload = multipart(png)
            upload_type = 'multipart/form-data; boundary=' + boundary
            customer.expect(403, '/admin/media', 'POST', upload, content_type=upload_type)
            admin.expect(400, '/admin/media', 'POST', multipart(b'<svg>not permitted</svg>'), content_type=upload_type)
            media = admin.expect(200, '/admin/media', 'POST', upload, content_type=upload_type)
            assert guest.expect(200, media['url'][4:]) == png
            admin.expect(200, '/admin/slides', 'PUT', [dict(slide, image=media['url'])])
            assert guest.expect(200, '/slides')['slides'][0]['image'] == media['url']
            admin.expect(200, '/admin/categories/103', 'PUT', {'name':'Nuts','image':media['url'],'sortOrder':2})
            products = json.loads(Path(os.environ['CATALOG_FIXTURE']).read_text()) if os.environ.get('CATALOG_FIXTURE') else json.loads(subprocess.check_output(['node', str(ROOT / 'tests/export_catalog.cjs')]))
            if products:
                admin.expect(200, '/admin/products/import', 'POST', products)
                admin.expect(409, '/admin/products/import', 'POST', products)
                for entry in products:
                    entry['isActive'] = False
                    admin.expect(200, '/admin/products/' + entry['id'], 'PUT', entry)
                print(f"PASS: imported and validated all {len(products)} existing catalog products")
            product = dict(id='test-almond', name='Test Almond', categoryId=103, image='/test.jpg', images=[], tagline='Fresh', price=200, weight='250g', variants=[{'weight':'250g','price':200},{'weight':'500g','price':380}], description='Test product', benefits=[], nutrition={'servingSize':'100g','items':[]}, storage=[], delivery=[], rating=0, reviews=0, stockQuantity=5, isActive=True, isBestSeller=True, isOffer=True)
            customer.expect(403, '/admin/products/test-almond', 'PUT', product)
            admin.expect(200, '/admin/products/test-almond', 'PUT', product)
            admin.expect(400, '/admin/products/test-almond', 'PUT', dict(product, categoryId=99999))
            assert len(guest.expect(200, '/products')) == 1
            assert guest.expect(200, '/products')[0]['isBestSeller']
            assert guest.expect(200, '/products')[0]['isOffer']
            address = customer.expect(200, '/addresses', 'POST', dict(fullName='Customer',phone='9000000000',line1='Test street',line2='',city='Hyderabad',state='Telangana',postalCode='502032',latitude=17.519,longitude=78.284))
            customer.expect(400, '/addresses', 'POST', dict(address['details'], latitude=999))
            other.expect(404, '/addresses/' + address['id'], 'DELETE')
            order = dict(addressId=address['id'], requestKey='10000000-0000-0000-0000-000000000001', additionalDetails='  Ring the bell.\nGift wrap if available.  ', items=[dict(productId='test-almond',weight='250g',quantity=2,price=1)])
            other.expect(400, '/orders', 'POST', order)
            invalid = dict(order, requestKey='10000000-0000-0000-0000-000000000002', items=[dict(productId='test-almond',weight='2kg',quantity=1)])
            customer.expect(400, '/orders', 'POST', invalid)
            customer.expect(400, '/orders', 'POST', dict(order, additionalDetails='x' * 1001))
            placed = customer.expect(200, '/orders', 'POST', order)
            assert placed['total'] == 400, placed
            assert placed['address']['latitude'] == 17.519
            assert placed['additionalDetails'] == 'Ring the bell.\nGift wrap if available.'
            assert admin.expect(200, '/admin/orders')[0]['additionalDetails'] == placed['additionalDetails']
            again = customer.expect(200, '/orders', 'POST', order)
            assert again['id'] == placed['id']
            assert guest.expect(200, '/products')[0]['stockQuantity'] == 3
            assert other.expect(200, '/orders') == []
            overstock = dict(order, requestKey='10000000-0000-0000-0000-000000000003', items=[dict(productId='test-almond',weight='250g',quantity=4)])
            customer.expect(409, '/orders', 'POST', overstock)
            assert guest.expect(200, '/products')[0]['stockQuantity'] == 3
            admin.expect(400, '/admin/orders/' + placed['id'] + '/status', 'PUT', {'status':'Delivered'})
            for status in ['Confirmed','Shipped','Delivered']:
                admin.expect(200, '/admin/orders/' + placed['id'] + '/status', 'PUT', {'status':status})
            assert customer.expect(200, '/orders')[0]['status'] == 'Delivered'
            product['isActive'] = False
            admin.expect(200, '/admin/products/test-almond', 'PUT', product)
            assert guest.expect(200, '/products') == []
            admin.expect(409, '/admin/categories/103', 'DELETE')
            admin.expect(204, '/admin/categories/103?reassignTo=102', 'DELETE')
            assert next(p for p in admin.expect(200, '/admin/products') if p['id'] == 'test-almond')['categoryId'] == 102
            customer.expect(204, '/auth/logout', 'POST', {})
            customer.expect(401, '/auth/me')
            # Simulate the previous release's database layout, then restart the new API.
            process.terminate(); process.wait(timeout=15)
            with sqlite3.connect(f'{directory}/test.db') as legacy:
                for table in ['Categories', 'StoreSettings', 'Media', 'LoginPhones']: legacy.execute(f'DROP TABLE {table}')
                payload = json.loads(legacy.execute("SELECT Json FROM Products WHERE Id='test-almond'").fetchone()[0])
                payload['categoryId'] = 2
                legacy.execute("UPDATE Products SET Json=? WHERE Id='test-almond'", (json.dumps(payload),))
                legacy.execute('ALTER TABLE Orders DROP COLUMN AdditionalDetails')
                legacy.execute('UPDATE AspNetUsers SET PhoneNumber = NULL')
                counts = [legacy.execute(f'SELECT COUNT(*) FROM {table}').fetchone()[0] for table in ['AspNetUsers','Addresses','Orders']]
            env['Authentication__Google__ClientId'] = ''
            process = subprocess.Popen([os.environ.get('DOTNET', 'dotnet'), 'run', '--no-build', '--project', str(ROOT / 'backend/Sadhya.Api')], env=env, stdout=log, stderr=log)
            for attempt in range(100):
                try:
                    if guest.call('/health')[0] == 200: break
                except OSError: pass
                time.sleep(.1)
            else: raise RuntimeError('Upgraded API failed to start')
            assert not guest.expect(200, '/auth/google/config')['enabled']
            guest.expect(503, '/auth/google', 'POST', {'credential':'not-a-google-token'})
            legacy_customer = Client()
            legacy_customer.expect(200, '/auth/login', 'POST', {'email':'customer@example.test','password':PASSWORD})
            assert legacy_customer.expect(200, '/auth/me')['phoneNumber'] is None
            with sqlite3.connect(f'{directory}/test.db') as upgraded:
                assert any(row[1] == 'AdditionalDetails' for row in upgraded.execute('PRAGMA table_info(Orders)'))
                assert upgraded.execute('SELECT AdditionalDetails FROM Orders').fetchone()[0] is None
                assert counts == [upgraded.execute(f'SELECT COUNT(*) FROM {table}').fetchone()[0] for table in ['AspNetUsers','Addresses','Orders']]
                assert json.loads(upgraded.execute("SELECT Json FROM Products WHERE Id='test-almond'").fetchone()[0])['categoryId'] == 103
            print('PASS: ordered categories, category CRUD/reassignment, admin-only raster uploads, media retrieval, delivery coordinates and non-destructive legacy database upgrade')
            print('PASS: mobile registration/normalization/login, duplicate and missing phone rejection, password-protected phone updates, invalid Google token rejection and legacy email login')
            print('PASS: registration, cookie login/logout, CSRF, customer/admin authorization, address ownership, server pricing, variants, stock, idempotent orders, order privacy/status, hidden products')
        except Exception:
            log.seek(0)
            print(log.read()[-8000:])
            raise
        finally:
            process.terminate()
            process.wait(timeout=15)
