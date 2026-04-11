import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import User

load_dotenv()
engine = create_engine(os.getenv("DATABASE_URL"))
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

try:
    users = db.query(User).all()
    print(f"Total Users in Postgres: {len(users)}")
    for u in users:
        print(f"- {u.email} ({u.name})")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
