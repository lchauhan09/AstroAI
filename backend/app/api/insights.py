from fastapi import APIRouter, Depends
from app.services.daily_insights import DailyInsightsEngine

router = APIRouter()
daily_engine = DailyInsightsEngine()

@router.get("/today")
def get_daily_cosmic_vibe():
    """
    Returns today's Panchang and overall cosmic energy for the dashboard.
    """
    return daily_engine.get_today_insights()
