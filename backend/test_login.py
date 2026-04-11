import http.client
import json

conn = http.client.HTTPConnection("127.0.0.1", 8000)
payload = "username=postgres_test@example.com&password=strongpassword"
headers = {'Content-Type': 'application/x-www-form-urlencoded'}

try:
    conn.request("POST", "/auth/login", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(f"Status: {res.status}")
    print(f"Response: {data.decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
