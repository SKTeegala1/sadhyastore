"""End-to-end API checks against a disposable SQLite database; never targets a live store.
Run: python tests/api_smoke.py (requires .NET 10 SDK on PATH).
"""
import http.cookiejar
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
    def call(self, path, method='GET', data=None, csrf=True):
        headers = {'Content-Type': 'application/json'}
        if method != 'GET' and csrf:
            _, token = self.call('/auth/csrf')
            headers['X-CSRF-TOKEN'] = token['token']
        request = urllib.request.Request(BASE + '/api' + path, data=json.dumps(data).encode() if data is not None else None, headers=headers, method=method)
        try:
            response = self.http.open(request)
        except urllib.error.HTTPError as e:
            response = e
        body = response.read()
        return response.status, json.loads(body) if body else None
    def expect(self, status, *args, **kwargs):
        actual, body = self.call(*args, **kwargs)
        assert actual == status, (args[0], status, actual, body)
        return body

with tempfile.TemporaryDirectory(prefix='sadhya-api-test-') as directory:
    env = dict(os.environ, ASPNETCORE_ENVIRONMENT='Development', ASPNETCORE_URLS=BASE,
               ConnectionStrings__Store=f'Data Source={directory}/test.db',
               BootstrapAdmin__Email='admin@example.test', BootstrapAdmin__Password=PASSWORD,
               Logging__LogLevel__Default='Warning')
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
            for client, email in [(customer, 'customer@example.test'), (other, 'other@example.test')]:
                client.expect(200, '/auth/register', 'POST', {'fullName':'Test Customer','email':email,'password':PASSWORD})
                client.expect(200, '/auth/login', 'POST', {'email':email,'password':PASSWORD})
                assert not client.expect(200, '/auth/me')['isAdmin']
                client.expect(403, '/admin/products')
            products = json.loads(Path(os.environ['CATALOG_FIXTURE']).read_text()) if os.environ.get('CATALOG_FIXTURE') else json.loads(subprocess.check_output(['node', str(ROOT / 'tests/export_catalog.cjs')]))
            if products:
                admin.expect(200, '/admin/products/import', 'POST', products)
                admin.expect(409, '/admin/products/import', 'POST', products)
                for entry in products:
                    entry['isActive'] = False
                    admin.expect(200, '/admin/products/' + entry['id'], 'PUT', entry)
                print(f"PASS: imported and validated all {len(products)} existing catalog products")
            product = dict(id='test-almond', name='Test Almond', categoryId=2, image='/test.jpg', images=[], tagline='Fresh', price=200, weight='250g', variants=[{'weight':'250g','price':200},{'weight':'500g','price':380}], description='Test product', benefits=[], nutrition={'servingSize':'100g','items':[]}, storage=[], delivery=[], rating=0, reviews=0, stockQuantity=5, isActive=True)
            customer.expect(403, '/admin/products/test-almond', 'PUT', product)
            admin.expect(200, '/admin/products/test-almond', 'PUT', product)
            assert len(guest.expect(200, '/products')) == 1
            address = customer.expect(200, '/addresses', 'POST', dict(fullName='Customer',phone='9000000000',line1='Test street',line2='',city='Hyderabad',state='Telangana',postalCode='502032'))
            other.expect(404, '/addresses/' + address['id'], 'DELETE')
            order = dict(addressId=address['id'], requestKey='10000000-0000-0000-0000-000000000001', items=[dict(productId='test-almond',weight='250g',quantity=2,price=1)])
            other.expect(400, '/orders', 'POST', order)
            invalid = dict(order, requestKey='10000000-0000-0000-0000-000000000002', items=[dict(productId='test-almond',weight='2kg',quantity=1)])
            customer.expect(400, '/orders', 'POST', invalid)
            placed = customer.expect(200, '/orders', 'POST', order)
            assert placed['total'] == 400, placed
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
            customer.expect(204, '/auth/logout', 'POST', {})
            customer.expect(401, '/auth/me')
            print('PASS: registration, cookie login/logout, CSRF, customer/admin authorization, address ownership, server pricing, variants, stock, idempotent orders, order privacy/status, hidden products')
        except Exception:
            log.seek(0)
            print(log.read()[-8000:])
            raise
        finally:
            process.terminate()
            process.wait(timeout=15)
