import http.client
import json

conn = http.client.HTTPConnection("127.0.0.1", 8000)
payload = json.dumps({
    "email": "last_hope@example.com",
    "name": "Last Hope User",
    "password": "strongpassword"
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
