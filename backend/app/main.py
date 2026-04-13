from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import traceback

from app.db import Base, engine, check_db_connectivity
from app.api import auth, user, astro, astro_natal, astro_transits

# Validate DB Connection on start
print("!!!!!!!!!!!!!!!!!!!! INITIALIZING ASTROAI BACKEND !!!!!!!!!!!!!!!!!!!!")
if not check_db_connectivity():
    print("FATAL: Could not establish a stable connection to PostgreSQL.")
    print("Please verify the credentials and connectivity in .env.")
else:
    print("SUCCESS: Established stable connection to PostgreSQL.")

app = FastAPI(title="AstroAI API")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"DEBUG: Incoming {request.method} {request.url.path}")
    try:
        response = await call_next(request)
        print(f"DEBUG: Response {response.status_code} for {request.url.path}")
        return response
    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        print(traceback.format_exc())
        from fastapi.responses import JSONResponse
        return JSONResponse(status_code=500, content={"detail": "Internal Server Error", "error": str(e)})

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(astro.router, prefix="/astro", tags=["astro"])
app.include_router(astro_natal.router, prefix="/astro", tags=["astro"])
app.include_router(astro_transits.router, prefix="/astro", tags=["astro"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AstroAI API"}

@app.get("/health/db")
def db_health():
    from sqlalchemy import text
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": engine.url.drivername,
            "host": engine.url.host
        }
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
