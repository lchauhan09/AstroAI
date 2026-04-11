import sqlite3
import psycopg2
import os
from dotenv import load_dotenv
import json

# Setup paths
backend_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(backend_dir, '.env')
sqlite_path = os.path.join(backend_dir, 'astroai.db')

# Load environment
load_dotenv(env_path)
pg_url = os.getenv("DATABASE_URL")
if pg_url:
    pg_url = pg_url.replace("postgresql+psycopg2://", "postgresql://")

def migrate():
    if not os.path.exists(sqlite_path):
        print(f"SQLite database not found at {sqlite_path}")
        return

    print("Connecting to SQLite...")
    sl_conn = sqlite3.connect(sqlite_path)
    sl_cur = sl_conn.cursor()

    print("Connecting to Postgres...")
    try:
        pg_conn = psycopg2.connect(pg_url)
        pg_cur = pg_conn.cursor()
    except Exception as e:
        print(f"Failed to connect to Postgres: {e}")
        return

    # Fetch users from SQLite
    try:
        sl_cur.execute("SELECT * FROM users")
        columns = [column[0] for column in sl_cur.description]
        users = sl_cur.fetchall()
        print(f"Found {len(users)} users in SQLite.")
    except Exception as e:
        print(f"Error reading SQLite: {e}")
        return

    # Prepare Postgres insert
    # Assuming columns match exactly. If not, we might need a mapping.
    # Postgres table 'users' should have same names.
    
    success_count = 0
    fail_count = 0

    for user in users:
        user_dict = dict(zip(columns, user))
        
        # Handle JSON fields (SQLite might store them as strings)
        if 'preferences' in user_dict and isinstance(user_dict['preferences'], str):
            try:
                user_dict['preferences'] = json.loads(user_dict['preferences'])
            except:
                pass

        # Construct query
        cols = ", ".join(user_dict.keys())
        placeholders = ", ".join(["%s"] * len(user_dict))
        query = f"INSERT INTO users ({cols}) VALUES ({placeholders}) ON CONFLICT (id) DO NOTHING"
        
        try:
            pg_cur.execute(query, list(user_dict.values()))
            success_count += 1
        except Exception as e:
            print(f"Failed to insert user {user_dict.get('email')}: {e}")
            fail_count += 1
            pg_conn.rollback()
        else:
            pg_conn.commit()

    print(f"Migration complete: {success_count} succeeded, {fail_count} failed.")
    
    sl_conn.close()
    pg_conn.close()

if __name__ == "__main__":
    migrate()
