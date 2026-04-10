from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.profile import Profile
import json

router = APIRouter()

@router.get("/{profile_id}")
def get_chart_data(profile_id: int, db: Session = Depends(get_db)):
    """
    Returns the complete Kundli + Numerology metadata for a specific profile.
    """
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return {
        "id": profile.id,
        "full_name": profile.full_name,
        "chart": json.loads(profile.chart_data),
        "numerology": json.loads(profile.numerology_data)
    }
