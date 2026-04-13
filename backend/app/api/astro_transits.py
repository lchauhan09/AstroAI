from fastapi import APIRouter
from datetime import datetime, timezone
from app.services.astro_engine import calculate_planet_positions

router = APIRouter()

@router.get("/transits")
def transits(lat: float = 0, lon: float = 0):
    now = datetime.now(timezone.utc)
    # Lat/Lon are optional for transits (impacts house position but not sign position)
    positions = calculate_planet_positions(now, lat, lon)
    return {
        "positions": positions,
        "timestamp": now.isoformat()
    }
