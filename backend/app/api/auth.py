from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
from passlib.context import CryptContext
import jwt
import os

from app.db import get_db
from app import models
from app.schemas import UserCreateEmail, UserCreateGoogle, UserOut, Token, AuthProvider

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET", "astroai_secret_key")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "60"))


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_password(plain_password, password_hash):
    return pwd_context.verify(plain_password, password_hash)


def hash_password(password: str):
    return pwd_context.hash(password)


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()


@router.post("/register/email", response_model=UserOut)
def register_email(user_in: UserCreateEmail, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = models.User(
        email=user_in.email,
        name=user_in.name,
        auth_provider=models.AuthProvider.email,
        password_hash=hash_password(user_in.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/register/google")
def register_google(user_in: UserCreateGoogle, db: Session = Depends(get_db)):
    user = get_user_by_email(db, user_in.email)

    if not user:
        user = models.User(
            email=user_in.email,
            name=user_in.name,
            avatar_url=user_in.avatar_url,
            auth_provider=models.AuthProvider.google,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # Create JWT
    access_token = create_access_token({"sub": user.id})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user,
    }


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.username)
    if not user or not user.password_hash:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    if not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token({"sub": user.id})
    return Token(access_token=access_token)


from app.deps import get_current_user

@router.get("/me", response_model=UserOut)
def read_me(current_user: models.User = Depends(get_current_user)):
    return current_user
