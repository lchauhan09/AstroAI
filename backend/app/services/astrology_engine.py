import swisseph as swe
from datetime import datetime
import json

class AstrologyEngine:
    """
    Core engine handling planetary calculations using Swiss Ephemeris.
    Supports North and South Indian chart layout data.
    """
    
    def __init__(self):
        # Path to ephemeris files (optional, default uses builtin)
        # swe.set_ephe_path('/path/to/ephemeris_data')
        pass

    def calculate_chart(self, dob: datetime, lat: float, lon: float):
        """
        Calculates all planetary positions and the ascendant (Lagna) for a given time and location.
        """
        # Julian Day number
        jd = swe.julday(dob.year, dob.month, dob.day, dob.hour + dob.minute/60.0)
        
        # Siderial Ayanamsa (Lahiri/Chitrapaksha)
        swe.set_sid_mode(swe.SIDM_LAHIRI)
        
        planets = {}
        planet_list = [swe.SUN, swe.MOON, swe.MARS, swe.MERCURY, swe.JUPITER, swe.VENUS, swe.SATURN, swe.RAHU, swe.KETU]
        planet_names = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]

        for i, p_id in enumerate(planet_list):
            # Calculate tropical position first
            if p_id in [swe.RAHU, swe.KETU]:
                res = swe.calc_ut(jd, p_id, swe.FLG_SWIEPH)[0]
            else:
                res = swe.calc_ut(jd, p_id, swe.FLG_SWIEPH | swe.FLG_SIDEREAL)[0]
            
            # Use Lahiri ayanamsa explicitly if needed
            ayanamsa = swe.get_ayanamsa_ut(jd)
            sidereal_pos = (res - ayanamsa) % 360 if p_id not in [swe.RAHU, swe.KETU] else res % 360
            
            sign_index = int(sidereal_pos / 30)
            sign_name = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][sign_index]
            
            degree = sidereal_pos % 30
            
            planets[planet_names[i]] = {
                "longitude": sidereal_pos,
                "sign": sign_name,
                "degree": degree,
                "house": 0 # Determined after house calculation
            }

        # Calculate Houses (Ascendant/Lagna)
        # 0 = Placidus/standard, 'W' = Whole Sign (common in Vedic)
        houses, ascmc = swe.houses_ex(jd, lat, lon, b'W')
        ascendant = ascmc[0]
        asc_sign = int(ascendant / 30)
        
        # Map planets to houses based on Whole Sign
        for p in planets:
            p_long = planets[p]["longitude"]
            p_sign = int(p_long / 30)
            # House relative to ascendant sign
            house_num = (p_sign - asc_sign) % 12 + 1
            planets[p]["house"] = house_num

        return {
            "ascendant": {
                "longitude": ascendant,
                "sign": ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][asc_sign],
                "degree": ascendant % 30
            },
            "planets": planets,
            "metadata": {
                "ayanamsa": ayanamsa,
                "sidereal_chart": True
            }
        }
