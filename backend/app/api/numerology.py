from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.services.numerology_engine import NumerologyEngine
from app.models import User
from app.deps import get_current_user

router = APIRouter()
num_engine = NumerologyEngine()

@router.get("/calculate")
def calculate_numerology(name: str, dob: str):
    """
    Stand-alone numerology calculator for name correction and life path.
    """
    result = num_engine.run_full_report(name, dob)
    return result

@router.get("/correction")
def suggest_name_correction(name: str, target: int = 45):
    """
    Vedic name correction assistant to reach auspicious vibration.
    """
    suggestion = num_engine.suggest_corrections(name, target)
    return {"original": name, "suggestion": suggestion, "target_vibration": target}

@router.get("/daily")
def get_daily_numerology(current_user = Depends(get_current_user)):
    """
    Returns daily numerology insights based on personal numbers and current date.
    """
    prefs = current_user.preferences or {}
    dob = prefs.get('birth_details', {}).get('date')
    name = current_user.name
    
    if not dob or not name:
        raise HTTPException(status_code=400, detail="Birth date and name must be configured in preferences.")
        
    base_report = num_engine.run_full_report(name, dob)
    
    try:
        b_year, b_month, b_day = map(int, dob.split('-'))
        today = datetime.now()
        
        personal_year = num_engine.reduce_number(b_month + b_day + today.year)
        personal_month = num_engine.reduce_number(personal_year + today.month)
        personal_day = num_engine.reduce_number(personal_month + today.day)
        
        # Simple interpretations based on personal day
        messages = {
            1: "New beginnings, independence, and taking initiative.",
            2: "Cooperation, balance, and sensitivity to others.",
            3: "Self-expression, creativity, and social interactions.",
            4: "Hard work, organization, and building foundations.",
            5: "Change, freedom, and seeking new experiences.",
            6: "Responsibilities, nurturing, and family matters.",
            7: "Introspection, spiritual growth, and analysis.",
            8: "Business matters, goal achievement, and material success.",
            9: "Endings, humanitarianism, and letting go."
        }
        
        msg = messages.get(personal_day, f"Focus on the vibrations of {personal_day} today.")
        
        return {
            "core_numbers": base_report,
            "daily": {
                "personal_day": personal_day,
                "personal_month": personal_month,
                "personal_year": personal_year,
                "date": today.strftime("%Y-%m-%d"),
                "message": msg
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating personal metrics: {str(e)}")
