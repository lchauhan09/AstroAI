from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import User
from app.schemas.onboarding import OnboardingData
from app.deps import get_current_user

router = APIRouter(prefix="/user", tags=["User"])

@router.post("/onboarding")
async def update_onboarding(
    data: OnboardingData,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if data.step == "completed":
        final_name = data.name or current_user.name
        final_birth_date = data.birth_date or current_user.birth_date
        final_location = data.location or current_user.location
        
        if not final_name or not final_birth_date or not final_location:
            raise HTTPException(
                status_code=400, 
                detail="Name, birth date, and location are mandatory to complete onboarding."
            )

    # Update onboarding step
    current_user.onboarding_step = data.step

    # Save name
    if data.name:
        current_user.name = data.name

    # Save birth details
    if data.birth_date:
        current_user.birth_date = data.birth_date

    if data.birth_time:
        current_user.birth_time = data.birth_time

    # Save location
    if data.location:
        current_user.location = data.location

    # Save coordinates
    if data.latitude is not None:
        current_user.latitude = data.latitude

    if data.longitude is not None:
        current_user.longitude = data.longitude

    # Save preferences JSON
    current_user.preferences = {
        "name": data.name,
        "birth_date": data.birth_date,
        "birth_time": data.birth_time,
        "location": data.location,
        "latitude": data.latitude,
        "longitude": data.longitude,
    }

    db.add(current_user)
    db.commit()
    db.refresh(current_user)

    return {
        "message": "Onboarding updated successfully",
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "name": current_user.name,
            "birth_date": current_user.birth_date,
            "birth_time": current_user.birth_time,
            "location": current_user.location,
            "latitude": current_user.latitude,
            "longitude": current_user.longitude,
            "onboarding_step": current_user.onboarding_step,
            "preferences": current_user.preferences,
        }
    }
