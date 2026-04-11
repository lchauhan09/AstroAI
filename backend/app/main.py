from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.db import Base, engine, check_db_connectivity
from app.api import auth, user

# Validate DB Connection on start
print("!!!!!!!!!!!!!!!!!!!! INITIALIZING ASTROAI BACKEND !!!!!!!!!!!!!!!!!!!!")
if not check_db_connectivity():
    print("FATAL: Could not establish a stable connection to PostgreSQL.")
    print("Please verify the credentials and connectivity in .env.")
else:
    print("SUCCESS: Established stable connection to PostgreSQL.")

# Auto-migrate if needed (Base.metadata is less ideal than Alembic but good for first start)
# Base.metadata.create_all(bind=engine)

app = FastAPI(title="AstroAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(user.router, prefix="/user", tags=["user"])

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
