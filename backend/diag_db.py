
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

db_url = os.getenv("DATABASE_URL")
if not db_url:
    print("DATABASE_URL not found in .env")
    exit(1)

engine = create_engine(db_url)

try:
    with engine.connect() as conn:
        print("Connected to DB successfully.")
        result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public'"))
        tables = [row[0] for row in result]
        print(f"Tables: {tables}")
        
        if 'users' in tables:
            res = conn.execute(text("SELECT count(*) FROM users"))
            print(f"User count: {res.scalar()}")
except Exception as e:
    print(f"Error: {e}")
