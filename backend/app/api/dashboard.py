from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import User
from app.deps import get_current_user
from app.services.numerology_engine import NumerologyEngine
from app.services.astro_engine import calculate_planet_positions, calculate_ascendant
from datetime import datetime
import httpx
import os

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])
num_engine = NumerologyEngine()

AGENT_URL = os.getenv("AGENT_URL", "http://localhost:8001/run")

@router.get("/")
async def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Ensure critical data is present regardless of onboarding_step
    if not current_user.name or not current_user.birth_date or not current_user.location:
         raise HTTPException(status_code=400, detail="User onboarding incomplete")

    # Extract user data
    name = current_user.name
    birth_date = current_user.birth_date
    birth_time = current_user.birth_time or "12:00:00"
    latitude = current_user.latitude or 0.0
    longitude = current_user.longitude or 0.0

    # 1. Numerology (Direct Call)
    numerology_data = num_engine.run_full_report(name, birth_date)
    
    # Calculate daily numerology
    today = datetime.now()
    try:
        b_year, b_month, b_day = map(int, birth_date.split('-'))
        personal_year = num_engine.reduce_number(b_month + b_day + today.year)
        personal_month = num_engine.reduce_number(personal_year + today.month)
        personal_day = num_engine.reduce_number(personal_month + today.day)
        
        daily_numerology = {
            "personal_day": personal_day,
            "message": f"Focus on the vibrations of {personal_day} today." # Simple placeholder
        }
    except:
        daily_numerology = {"message": "Numerology data unavailable"}

    # 2. Astrology (Direct Call)
    dt_str = f"{birth_date}T{birth_time}"
    dt = datetime.fromisoformat(dt_str)
    
    astrology_data = {
        "planets": calculate_planet_positions(dt, latitude, longitude),
        "ascendant": calculate_ascendant(dt, latitude, longitude)
    }

    # 3. AI Agent (External Call)
    ai_insight = {"message": "AI cosmic insights are being prepared..."}
    try:
        async with httpx.AsyncClient() as client:
            ai_res = await client.post(
                AGENT_URL,
                json={
                    "workflow": "daily_insight",
                    "input": {
                        "name": name,
                        "birth_date": birth_date,
                        "birth_time": birth_time,
                        "latitude": latitude,
                        "longitude": longitude,
                        "numerology": numerology_data,
                        "astrology": astrology_data
                    }
                },
                timeout=10.0
            )
            if ai_res.status_code == 200:
                ai_insight = ai_res.json()
    except Exception as e:
        print(f"DEBUG: AI Agent error: {str(e)}")

    return {
        "user": {
            "id": current_user.id,
            "name": name,
            "email": current_user.email,
            "onboarding_step": current_user.onboarding_step
        },
        "numerology": {
            "core": numerology_data,
            "daily": daily_numerology
        },
        "astrology": astrology_data,
        "ai_insight": ai_insight
    }

@router.get("/weekly")
async def get_weekly_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user.name or not current_user.birth_date:
         raise HTTPException(status_code=400, detail="User onboarding incomplete")

    # Extract user data
    name = current_user.name
    birth_date = current_user.birth_date
    birth_time = current_user.birth_time or "12:00:00"
    latitude = current_user.latitude or 0.0
    longitude = current_user.longitude or 0.0

    async with httpx.AsyncClient() as client:
        ai_res = await client.post(
            AGENT_URL,
            json={
                "workflow": "weekly_forecast",
                "input": {
                    "name": name,
                    "birth_date": birth_date,
                    "birth_time": birth_time,
                    "latitude": latitude,
                    "longitude": longitude,
                },
            },
            timeout=15.0
        )
        if ai_res.status_code == 200:
            return ai_res.json()
        else:
            raise HTTPException(status_code=ai_res.status_code, detail="AI Agent failed to generate forecast")
