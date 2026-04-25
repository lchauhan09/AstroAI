import swisseph as swe
from datetime import datetime
import math

# Paths are handled by pyswisseph defaults if not set, but we can set them if needed
# swe.set_ephe_path("/usr/share/ephe") 

SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

PLANETS = {
    "Sun": swe.SUN,
    "Moon": swe.MOON,
    "Mercury": swe.MERCURY,
    "Venus": swe.VENUS,
    "Mars": swe.MARS,
    "Jupiter": swe.JUPITER,
    "Saturn": swe.SATURN,
    "Uranus": swe.URANUS,
    "Neptune": swe.NEPTUNE,
    "Pluto": swe.PLUTO,
    "Rahu": swe.TRUE_NODE,
}

def get_sign(degree):
    return SIGNS[int(degree // 30) % 12]

def calculate_planet_positions(dt: datetime, lat: float = 0, lon: float = 0, sidereal: bool = True):
    """
    Calculates planetary positions. 
    Sidereal (Vedic) is default as requested for "REAL" astrology.
    """
    # Julian Day
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute/60.0 + dt.second/3600.0)
    
    if sidereal:
        swe.set_sid_mode(swe.SIDM_LAHIRI)
        flag = swe.FLG_SWIEPH | swe.FLG_SIDEREAL
    else:
        flag = swe.FLG_SWIEPH

    positions = {}
    for name, planet_id in PLANETS.items():
        if name == "Rahu":
            # Rahu is usually calculated tropically then converted to sidereal if needed
            res = swe.calc_ut(jd, planet_id, swe.FLG_SWIEPH | (swe.FLG_SIDEREAL if sidereal else 0))[0][0]
        else:
            res = swe.calc_ut(jd, planet_id, flag)[0][0]

        pos = res

        positions[name] = {
            "degree": pos,
            "sign": get_sign(pos),
            "sign_degree": pos % 30,
        }

    # Add Ketu (180 degrees from Rahu)
    rahu_pos = positions["Rahu"]["degree"]
    ketu_pos = (rahu_pos + 180) % 360
    positions["Ketu"] = {
        "degree": ketu_pos,
        "sign": get_sign(ketu_pos),
        "sign_degree": ketu_pos % 30,
    }

    return positions

def calculate_ascendant(dt: datetime, lat: float, lon: float, sidereal: bool = True):
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute/60.0 + dt.second/3600.0)
    
    # House system 'W' for Whole Sign, 'P' for Placidus
    method = b'W' if sidereal else b'P'
    
    # Calculate houses
    # returns (houses, ascmc)
    res = swe.houses_ex(jd, lat, lon, method)
    houses = res[0]
    ascmc = res[1]
    
    asc = ascmc[0] # Ascendant is the first element of ascmc
    
    if sidereal:
        ayanamsa = swe.get_ayanamsa_ut(jd)
        asc = (asc - ayanamsa) % 360

    return {
        "degree": asc,
        "sign": get_sign(asc),
        "sign_degree": asc % 30,
    }

def get_houses(dt: datetime, lat: float, lon: float, sidereal: bool = True):
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute/60.0 + dt.second/3600.0)
    method = b'W' if sidereal else b'P'
    res = swe.houses_ex(jd, lat, lon, method)
    houses = res[0]
    
    ayanamsa = 0
    if sidereal:
        ayanamsa = swe.get_ayanamsa_ut(jd)
        
    house_data = []
    for i, h in enumerate(houses):
        pos = (h - ayanamsa) % 360 if sidereal else h
        house_data.append({
            "house": i + 1,
            "degree": pos,
            "sign": get_sign(pos),
            "sign_degree": pos % 30
        })
    return house_data
