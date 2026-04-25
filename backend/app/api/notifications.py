from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import User
from app.deps import get_current_user

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.post("/register")
async def register_push_token(
    payload: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    token = payload.get("token")
    if not token:
        raise HTTPException(status_code=400, detail="Token is required")
    
    current_user.push_token = token
    db.commit()
    return {"message": "Push token registered successfully"}
