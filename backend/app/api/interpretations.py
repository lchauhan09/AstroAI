from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.profile import Profile
from app.services.interpreter import AstroAIInterpreter
import json

router = APIRouter()
ai_interpreter = AstroAIInterpreter()

@router.post("/{profile_id}")
async def get_ai_interpretation(profile_id: int, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    chart_data = json.loads(profile.chart_data)
    num_data = json.loads(profile.numerology_data)
    
    # Run the "Wow Feature" AI interpretation
    interpretation = await ai_interpreter.get_interpretation(chart_data, num_data)
    
    # Optionally: cache or store the interpretation in the db
    # For now, return it directly to the dashboard
    return interpretation
