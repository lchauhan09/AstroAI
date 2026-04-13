from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import random

from app.db import get_db
from app.deps import get_current_user
from app.models import User

router = APIRouter()

# Placeholder daily horoscope generator
def generate_daily_horoscope():
    messages = [
        "Today brings clarity and renewed focus.",
        "A powerful shift in energy opens new opportunities.",
        "Trust your intuition — it’s unusually strong today.",
        "A meaningful connection may reveal itself.",
        "Your creativity is at its peak — use it wisely.",
    ]
    return random.choice(messages)

# Placeholder moon phase
def get_moon_phase():
    phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
              "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"]
    return random.choice(phases)

# Placeholder planetary transits
def get_transits():
    return [
        {"planet": "Mercury", "status": "Direct"},
        {"planet": "Venus", "status": "Harmonious"},
        {"planet": "Mars", "status": "Energetic"},
    ]

@router.get("/daily")
def daily_astro(current_user: User = Depends(get_current_user)):
    return {
        "horoscope": generate_daily_horoscope(),
        "moon_phase": get_moon_phase(),
        "lucky_number": random.randint(1, 99),
        "lucky_color": random.choice(["Gold", "Blue", "Purple", "Red"]),
        "transits": get_transits(),
        "timestamp": datetime.now(timezone.utc),
    }
