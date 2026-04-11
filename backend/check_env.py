import os
from dotenv import load_dotenv
load_dotenv()
print(f"DATABASE_URL used: {os.getenv('DATABASE_URL')}")
