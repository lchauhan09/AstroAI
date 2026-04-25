import os
import asyncio
import httpx
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models import User

async def process_user_notification(user_id: str, name: str, push_token: str):
    """Generates a cosmic insight and sends a push notification via Expo."""
    # Simple cosmic message
    message = f"The stars are aligned for your growth today, {name}. Focus on your inner clarity."
    
    # In a real scenario, you might call your AI agent here to get a personalized message
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://exp.host/--/api/v2/push/send",
                json={
                    "to": push_token,
                    "sound": "default",
                    "title": "Your Daily Cosmic Insight",
                    "body": message,
                    "data": {"type": "daily_insight"}
                },
                timeout=10.0
            )
            print(f"Push sent to {name}: {response.status_code}")
    except Exception as e:
        print(f"Error sending push to {name}: {e}")

def send_daily_notifications():
    print(f"Running daily notifications at {datetime.now()}")
    db: Session = SessionLocal()
    try:
        users = db.query(User).filter(User.push_token != None).all()
        for user in users:
            # Run the async push task
            asyncio.run(process_user_notification(user.id, user.name or "Cosmic Traveler", user.push_token))
    finally:
        db.close()

async def process_weekly_notification(user_id: str, name: str, push_token: str):
    """Generates a weekly summary and sends a push notification."""
    message = f"Your Week Ahead: Alignment and focused growth. Sunday is your reset day."
    
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                "https://exp.host/--/api/v2/push/send",
                json={
                    "to": push_token,
                    "sound": "default",
                    "title": "Your Week Ahead",
                    "body": message,
                    "data": {"type": "weekly_forecast"}
                },
                timeout=10.0
            )
    except Exception as e:
        print(f"Error sending weekly push to {name}: {e}")

def send_weekly_notifications():
    print(f"Running weekly notifications at {datetime.now()}")
    db: Session = SessionLocal()
    try:
        users = db.query(User).filter(User.push_token != None).all()
        for user in users:
            asyncio.run(process_weekly_notification(user.id, user.name or "Cosmic Traveler", user.push_token))
    finally:
        db.close()

def start_scheduler():
    scheduler = BackgroundScheduler()
    # Schedule daily at 7:00 AM
    scheduler.add_job(send_daily_notifications, 'cron', hour=7, minute=0)
    
    # Schedule weekly on Sunday at 9:00 AM
    scheduler.add_job(send_weekly_notifications, 'cron', day_of_week='sun', hour=9, minute=0)
    
    scheduler.start()
    print("Cosmic Scheduler Initialized (7:00 AM Daily, 9:00 AM Sundays)")
