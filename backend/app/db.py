import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load .env from the backend root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, '.env'))

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Attempt fallback to SQLite if needed, but per requirements we want Postgres
    print("WARNING: DATABASE_URL not found in environment. Please check .env file.")
    # For now, let's keep it strict to avoid accidental SQLite persistence
    raise ValueError("CRITICAL: DATABASE_URL is missing!")

# Postgres optimization: pool_size, max_overflow, pool_timeout
# These ensure "stable" connections as requested
engine_args = {
    "future": True,
}

if "postgresql" in DATABASE_URL:
    engine_args.update({
        "pool_size": 10,
        "max_overflow": 20,
        "pool_recycle": 3600,
        "pool_pre_ping": True, # Vital for "stable" connectivity
    })
elif "sqlite" in DATABASE_URL:
    engine_args.update({
        "connect_args": {"check_same_thread": False}
    })

engine = create_engine(DATABASE_URL, **engine_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_db_connectivity():
    """Verify that we can actually talk to the database on startup."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception as e:
        print(f"CRITICAL: Database connectivity check failed! Error: {e}")
        return False

