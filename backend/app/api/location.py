import httpx, time
from fastapi import APIRouter, Query

router = APIRouter()

CACHE = {}
CACHE_TTL = 60  # seconds

@router.get("/search")
async def search_location(q: str = Query(..., min_length=2)):
    now = time.time()

    # return cached result if fresh
    if q in CACHE and now - CACHE[q]["time"] < CACHE_TTL:
        return CACHE[q]["data"]

    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": q,
        "format": "json",
        "addressdetails": 1,
        "limit": 5,
    }

    async with httpx.AsyncClient() as client:
        r = await client.get(url, params=params, headers={"User-Agent": "AstroAI"})
        data = r.json()

        CACHE[q] = {"data": data, "time": now}
        return data
