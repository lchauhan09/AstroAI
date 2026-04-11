import http.client
import json
import time

# Give some time for server to bind if needed
time.sleep(1)

conn = http.client.HTTPConnection("127.0.0.1", 8000)
payload = json.dumps({
    "email": "test_bot@example.com",
    "name": "Bot User",
    "password": "botpassword"
})
headers = {'Content-Type': 'application/json'}

try:
    conn.request("POST", "/auth/register/email", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(f"Status: {res.status}")
    print(f"Response: {data.decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
