from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import User
from app.deps import get_current_user

router = APIRouter()


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "avatar_url": current_user.avatar_url,
        "onboarding_step": current_user.onboarding_step,
        "preferences": current_user.preferences,
    }


@router.post("/preferences")
def update_preferences(
    prefs: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    current_prefs = current_user.preferences or {}
    
    # Handle name explicitly if they pass it in prefs
    if "name" in prefs:
        current_user.name = prefs.pop("name")

    # Merge remaining fields securely
    updated_prefs = {**current_prefs, **prefs}
    current_user.preferences = updated_prefs
    
    db.commit()
    db.refresh(current_user)
    return {"message": "Preferences updated", "preferences": current_user.preferences}
