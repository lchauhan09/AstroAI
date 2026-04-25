from pydantic import BaseModel, EmailStr
from typing import Optional, Any, Dict
from enum import Enum


class AuthProvider(str, Enum):
    google = "google"
    email = "email"


class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    avatar_url: Optional[str] = None


class UserCreateEmail(UserBase):
    password: str
    auth_provider: AuthProvider = AuthProvider.email


class UserCreateGoogle(UserBase):
    auth_provider: AuthProvider = AuthProvider.google


class UserOut(UserBase):
    id: str
    auth_provider: AuthProvider
    onboarding_step: str
    preferences: Dict[str, Any]

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
