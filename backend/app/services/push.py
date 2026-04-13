import httpx
from typing import Optional

async def send_push(token: str, title: str, body: str, data: Optional[dict] = None):
    """
    Sends a push notification using Expo's Push API.
    """
    url = "https://exp.host/--/api/v2/push/send"
    
    payload = {
        "to": token,
        "title": title,
        "body": body,
        "sound": "default",
    }
    
    if data:
        payload["data"] = data

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Failed to send push notification to {token}: {e}")
            return None
