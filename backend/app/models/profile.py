from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.db import Base

class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    full_name = Column(String)
    dob = Column(DateTime)
    tob = Column(String) # For time precision storage
    place_of_birth = Column(String)
    lat = Column(Float)
    lon = Column(Float)
    tz = Column(String, default="Asia/Kolkata")
    
    # Store computed chart metadata as JSON for faster retrieval
    chart_data = Column(Text, nullable=True) 
    numerology_data = Column(Text, nullable=True) 
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
