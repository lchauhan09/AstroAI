from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.profile import Profile
from app.api.schemas import ProfileCreate, ProfileResponse
from app.services.astrology_engine import AstrologyEngine
from app.services.numerology_engine import NumerologyEngine
import json

router = APIRouter()
astro = AstrologyEngine()
num = NumerologyEngine()

@router.post("/", response_model=ProfileResponse)
def create_profile(profile_in: ProfileCreate, db: Session = Depends(get_db)):
    # Calculate initial chart data
    chart_data = astro.calculate_chart(profile_in.dob, profile_in.lat, profile_in.lon)
    # Calculate numerology
    num_data = num.run_full_report(profile_in.full_name, profile_in.dob.strftime('%Y-%m-%d'))
    
    new_profile = Profile(
        user_id=1, # Mock: Usually get from current user auth
        full_name=profile_in.full_name,
        dob=profile_in.dob,
        tob=profile_in.tob,
        place_of_birth=profile_in.place_of_birth,
        lat=profile_in.lat,
        lon=profile_in.lon,
        chart_data=json.dumps(chart_data),
        numerology_data=json.dumps(num_data)
    )
    
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get("/me", response_model=list[ProfileResponse])
def get_my_profiles(db: Session = Depends(get_db)):
    # Mock hardcoded user 1
    return db.query(Profile).filter(Profile.user_id == 1).all()

@router.get("/{id}")
def get_profile_details(id: int, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.id == id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return {
        "id": profile.id,
        "full_name": profile.full_name,
        "dob": profile.dob,
        "chart": json.loads(profile.chart_data),
        "numerology": json.loads(profile.numerology_data)
    }
