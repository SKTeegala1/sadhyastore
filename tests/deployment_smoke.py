"""Production-mode gateway, secure cookie, storage and restart checks on a disposable database."""
import http.cookies
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
TOKEN = secrets.token_urlsafe(32)
PASSWORD = secrets.token_urlsafe(24) + 'Aa1!'
cookies = {}

def call(path, method='GET', data=None, token=TOKEN, csrf=None):
    # HTTP here simulates Render's internal connection from the trusted HTTPS gateway.
    headers = {'X-Sadhya-Gateway-Key': token, 'Host': 'sadhya-deployment-test.onrender.com'}
    if cookies:
        headers['Cookie'] = '; '.join(f'{key}={value}' for key, value in cookies.items())
    if csrf:
        headers['X-CSRF-TOKEN'] = csrf
    if data is not None:
        headers['Content-Type'] = 'application/json'
    request = urllib.request.Request(BASE + path, headers=headers, method=method,
                                     data=json.dumps(data).encode() if data is not None else None)
    try:
        response = urllib.request.urlopen(request)
    except urllib.error.HTTPError as error:
        response = error
    for header in response.headers.get_all('Set-Cookie') or []:
        parsed = http.cookies.SimpleCookie()
        parsed.load(header)
        for name, item in parsed.items():
            assert item['secure'], 'Production cookies must be secure'
            cookies[name] = item.value
    body = response.read()
    return response.status, json.loads(body) if body else None

def ready(process):
    for _ in range(100):
        if process.poll() is not None:
            raise RuntimeError('Production API stopped before startup')
        try:
            if call('/api/health', token='')[0] == 200:
                return
        except OSError:
            pass
        time.sleep(.1)
    raise RuntimeError('Production API did not become healthy')

with tempfile.TemporaryDirectory(prefix='sadhya-deployment-') as directory:
    env = dict(os.environ, ASPNETCORE_ENVIRONMENT='Production', ASPNETCORE_URLS=BASE,
               RENDER_EXTERNAL_HOSTNAME='sadhya-deployment-test.onrender.com',
               ConnectionStrings__Store=f'Data Source={directory}/sadhya.db',
               DataProtection__KeyPath=f'{directory}/keys', Gateway__Token=TOKEN,
               BootstrapAdmin__Email='admin@example.test', BootstrapAdmin__Password=PASSWORD,
               Logging__LogLevel__Default='Warning')
    command = [os.environ.get('DOTNET', 'dotnet'), 'run', '--no-build', '--project', str(ROOT / 'backend/Sadhya.Api')]
    with open(f'{directory}/server.log', 'w+') as log:
        process = subprocess.Popen(command, env=env, stdout=log, stderr=log)
        try:
            ready(process)
            assert call('/api/products', token='')[0] == 403
            assert call('/api/products', token='wrong')[0] == 403
            assert call('/api/products')[0] == 200
            status, csrf = call('/api/auth/csrf')
            assert status == 200, (status, csrf)
            status, body = call('/api/auth/login', 'POST', {'identifier':'admin@example.test','password':PASSWORD}, csrf=csrf['token'])
            assert status == 200, (status, body)
            assert call('/api/auth/me')[1]['isAdmin']
            assert list(Path(directory, 'keys').glob('key-*.xml'))
            process.terminate()
            process.wait(timeout=15)
            env.pop('BootstrapAdmin__Password')
            process = subprocess.Popen(command, env=env, stdout=log, stderr=log)
            ready(process)
            assert call('/api/auth/me')[1]['isAdmin'], 'Login cookie must survive a restart'
            print('PASS: production host allowlist, gateway enforcement, HTTPS CSRF/secure cookies, persistent database/keys and authenticated restart')
        except Exception:
            log.seek(0)
            print(log.read()[-8000:])
            raise
        finally:
            process.terminate()
            process.wait(timeout=15)
