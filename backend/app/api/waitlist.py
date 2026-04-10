from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter()

class WaitlistEntry(BaseModel):
    email: EmailStr
    full_name: str

@router.post("/")
async def add_to_waitlist(entry: WaitlistEntry):
    # Mock storage
    return {"message": "You have been added to the AstroAI waitlist!", "status": "In line for Ancient Wisdom"}
