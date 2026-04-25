from sqlalchemy import Column, String, Boolean, DateTime, Enum, JSON, Float, Numeric
from sqlalchemy.sql import func
import uuid
import enum

from app.db import Base


class AuthProvider(str, enum.Enum):
    google = "google"
    email = "email"


def uuid_str():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=uuid_str, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)

    auth_provider = Column(Enum(AuthProvider), nullable=False)
    password_hash = Column(String, nullable=True)

    onboarding_step = Column(String, default="start")
    
    # Onboarding Details
    birth_date = Column(String, nullable=True)
    birth_time = Column(String, nullable=True)
    location = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    preferences = Column(JSON, default={})
    push_token = Column(String, nullable=True)

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
