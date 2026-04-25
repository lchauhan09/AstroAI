from pydantic import BaseModel, Field
from typing import Optional

class OnboardingData(BaseModel):
    step: str = Field(..., description="Current onboarding step")
    name: Optional[str] = None
    birth_date: Optional[str] = None
    birth_time: Optional[str] = None
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
