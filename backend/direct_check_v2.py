import psycopg2
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))
url = os.getenv("DATABASE_URL")
if url:
    url = url.replace("postgresql+psycopg2://", "postgresql://")
print(f"Connecting to: {url}")

try:
    conn = psycopg2.connect(url)
    cur = conn.cursor()
    
    # Check table existence and schema
    cur.execute("SELECT table_schema, table_name FROM information_schema.tables WHERE table_name = 'users';")
    tables = cur.fetchall()
    print(f"Tables found: {tables}")
    
    cur.execute("SELECT count(*) FROM users;")
    count = cur.fetchone()[0]
    print(f"User count in Postgres (direct): {count}")
    
    cur.execute("SELECT email FROM users;")
    users = cur.fetchall()
    for u in users:
        print(f"User email: {u[0]}")
        
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
