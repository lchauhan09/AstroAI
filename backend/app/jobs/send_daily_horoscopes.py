from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models import User
from app.services.push import send_push
from app.api.astro import generate_daily_horoscope
import asyncio

async def run():
    print("Starting daily horoscope job...")
    db: Session = SessionLocal()

    try:
        users = db.query(User).all()

        for user in users:
            token = user.preferences.get("push_token")
            if not token:
                continue

            print(f"Sending horoscope to {user.email}")
            horoscope = generate_daily_horoscope()

            await send_push(
                token,
                title="Your Daily Horoscope",
                body=horoscope
            )
            
        print("Daily horoscope job completed.")
    except Exception as e:
        print(f"Error in daily horoscope job: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(run())
