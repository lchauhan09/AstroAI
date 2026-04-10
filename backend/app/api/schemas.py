from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProfileCreate(BaseModel):
    full_name: str
    dob: datetime
    tob: str # HH:MM
    place_of_birth: str
    lat: float
    lon: float

class ProfileResponse(BaseModel):
    id: int
    full_name: str
    dob: datetime
    place_of_birth: str
    
    class Config:
        from_attributes = True

class ChartResponse(BaseModel):
    id: int
    chart_json: dict
    num_json: dict
    interpretation_json: Optional[dict] = None

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class Token(BaseModel):
    access_token: str
    token_type: str
