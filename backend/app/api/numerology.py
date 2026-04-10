from fastapi import APIRouter
from app.services.numerology_engine import NumerologyEngine

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
