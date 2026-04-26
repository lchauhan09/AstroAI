import sys
import os

sys.path.append('d:\\Lokesh\\GitHub\\AstroAI\\backend')

from app.db import SessionLocal
from app.models import User

db = SessionLocal()
users = db.query(User).all()
for u in users:
    print(f"ID: {u.id}, Name: {u.name}, Email: {u.email}, Step: {u.onboarding_step}, Date: {u.birth_date}, Time: {u.birth_time}, Loc: {u.location}, Lat: {u.latitude}, Lon: {u.longitude}")
