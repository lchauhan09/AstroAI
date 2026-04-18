
import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_auth_flow():
    print("--- Testing Auth Flow ---")
    
    # 1. Login
    login_url = f"{BASE_URL}/auth/login"
    payload = {
        "username": "test_agent@example.com",
        "password": "password123"
    }
    
    print(f"Logging in as {payload['username']}...")
    try:
        # FastAPI's OAuth2PasswordRequestForm expects form data
        res = requests.post(login_url, data=payload)
        res.raise_for_status()
        token_data = res.json()
        token = token_data.get("access_token")
        print("Login successful.")
        
        # 2. Get /me
        me_url = f"{BASE_URL}/user/me"
        headers = {
            "Authorization": f"Bearer {token}"
        }
        res = requests.get(me_url, headers=headers)
        res.raise_for_status()
        user_data = res.json()
        print(f"User /me success: {user_data.get('email')}")
        
    except Exception as e:
        print(f"FAILED: {e}")
        if hasattr(e, 'response') and e.response:
            print(f"Response: {e.response.text}")

if __name__ == "__main__":
    test_auth_flow()
