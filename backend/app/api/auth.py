from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from app.api.schemas import UserCreate, Token 
from app.db import get_db

router = APIRouter()

# In a real app: use secrets for these
SECRET_KEY = "astroai_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post("/register")
async def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Mock registration
    return {"message": "User registered successfully", "email": user_in.email}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Mock authentication
    if form_data.username == "test@astroai.com" and form_data.password == "password123":
        return {"access_token": "mock_jwt_token_for_lokesh", "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Incorrect email or password")

@router.get("/me")
async def read_users_me():
    # Mock current user info
    return {
        "id": 1,
        "email": "test@astroai.com",
        "full_name": "Lokesh Chauhan",
        "is_active": True
    }
