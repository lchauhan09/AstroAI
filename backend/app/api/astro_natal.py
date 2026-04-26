from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app.services.astro_engine import calculate_planet_positions, calculate_ascendant, get_houses
from app.deps import get_current_user
from app.models import User

router = APIRouter()

class NatalRequest(BaseModel):
    datetime: str
    lat: float
    lon: float

@router.post("/natal")
def natal_chart(data: NatalRequest):
    try:
        dt = datetime.fromisoformat(data.datetime.replace("Z", ""))
        lat = data.lat
        lon = data.lon

        planets = calculate_planet_positions(dt, lat, lon)
        ascendant = calculate_ascendant(dt, lat, lon)
        houses = get_houses(dt, lat, lon)

        return {
            "planets": planets,
            "ascendant": ascendant,
            "houses": houses,
            "timestamp": dt.isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/my-natal")
def my_natal_chart(current_user: User = Depends(get_current_user)):
    if not current_user.birth_date:
        raise HTTPException(status_code=400, detail="Birth details not found in user profile")
    
    dt_str = f"{current_user.birth_date}T{current_user.birth_time or '12:00:00'}"
    lat = current_user.latitude or 0.0
    lon = current_user.longitude or 0.0
    
    dt = datetime.fromisoformat(dt_str)
    planets = calculate_planet_positions(dt, lat, lon)
    ascendant = calculate_ascendant(dt, lat, lon)
    houses = get_houses(dt, lat, lon)

    return {
        "planets": planets,
        "ascendant": ascendant,
        "houses": houses,
        "user_email": current_user.email
    }
