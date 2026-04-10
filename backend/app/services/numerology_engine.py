import re

class NumerologyEngine:
    """
    Handles Name and Date calculations using both Chaldean and Pythagorean systems.
    """
    
    CHALDEAN_MAP = {
        'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
        'B': 2, 'K': 2, 'R': 2,
        'C': 3, 'G': 3, 'L': 3, 'S': 3,
        'D': 4, 'M': 4, 'T': 4,
        'E': 5, 'H': 5, 'N': 5, 'X': 5,
        'U': 6, 'V': 6, 'W': 6,
        'O': 7, 'Z': 7,
        'F': 8, 'P': 8
    }

    PYTHAGOREAN_MAP = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    }

    def reduce_number(self, num: int, allow_master: bool = True):
        """Reduces a number to a single digit (except master numbers 11, 22, 33 if allowed)."""
        while num > 9:
            if allow_master and num in [11, 22, 33]:
                return num
            num = sum(int(d) for d in str(num))
        return num

    def calculate_name_number(self, name: str, system: str = 'Chaldean'):
        """Computes the expression/destiny number from a full name."""
        name = re.sub(r'[^A-Z]', '', name.upper())
        val_map = self.CHALDEAN_MAP if system == 'Chaldean' else self.PYTHAGOREAN_MAP
        total = sum(val_map.get(char, 0) for char in name)
        return total, self.reduce_number(total)

    def calculate_life_path(self, dob_str: str): # Format 'YYYY-MM-DD'
        """Computes the Life Path number from birth date."""
        digits = [int(d) for d in re.sub(r'[^0-9]', '', dob_str)]
        total = sum(digits)
        return total, self.reduce_number(total)

    def suggest_corrections(self, name: str, target_val: int):
        """Suggests basic name edits to align with a more auspicious frequency."""
        # Simple proof-of-concept: add an extra vowel or 'S/K/N'
        # In a real app, this would use a more complex dictionary of sounds.
        current_val, _ = self.calculate_name_number(name)
        needed = target_val - (current_val % target_val)
        return f"{name} (Add letters to reaching vibration {target_val})"

    def run_full_report(self, name: str, dob_str: str):
        lp_total, lp_val = self.calculate_life_path(dob_str)
        dest_total, dest_val = self.calculate_name_number(name)
        
        return {
            "life_path_number": lp_val,
            "destiny_number": dest_val,
            "soul_urge": 5, # Mock: Usually calculated from vowels
            "personality_number": 2, # Mock: Usually calculated from consonants
            "vibration_total": dest_total,
            "system_used": "Chaldean (Vedic Hybrid)"
        }
