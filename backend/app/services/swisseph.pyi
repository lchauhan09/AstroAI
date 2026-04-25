from typing import Any, Tuple, List, Union

# Planets
SUN: int
MOON: int
MERCURY: int
VENUS: int
MARS: int
JUPITER: int
SATURN: int
URANUS: int
NEPTUNE: int
PLUTO: int
TRUE_NODE: int
MEAN_NODE: int

# Flags
FLG_SWIEPH: int
FLG_SIDEREAL: int

# Sidereal Modes
SIDM_LAHIRI: int

def julday(year: int, month: int, day: int, hour: float = ...) -> float: ...
def set_sid_mode(sid_mode: int, t0: float = ..., ayan_t0: float = ...) -> None: ...
def calc_ut(jd: float, ipl: int, iflag: int) -> Tuple[Tuple[float, ...], str]: ...
def houses_ex(jd: float, lat: float, lon: float, hsys: Union[bytes, str]) -> Tuple[List[float], List[float]]: ...
def get_ayanamsa_ut(jd: float) -> float: ...
def set_ephe_path(path: str) -> None: ...
version: str
