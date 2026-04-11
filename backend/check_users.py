from app.db import SessionLocal
from app.models import User

db = SessionLocal()
users = db.query(User).all()
print(f"Total Users: {len(users)}")
for u in users:
    print(f"- {u.email} ({u.name})")
db.close()
