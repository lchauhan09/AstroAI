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
    cur.execute("SELECT count(*) FROM users;")
    count = cur.fetchone()[0]
    print(f"User count in Postgres (direct): {count}")
    cur.execute("SELECT email FROM users;")
    for row in cur.fetchall():
        print(f"User: {row[0]}")
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
