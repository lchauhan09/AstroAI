import asyncio
import sys
import os

# Add the current directory to sys.path to allow importing from 'app'
sys.path.append(os.path.join(os.path.dirname(__file__), "app"))
# Better yet, adding the project root if everything is within backend
sys.path.append(os.path.dirname(__file__))

from app.jobs.send_daily_horoscopes import run

if __name__ == "__main__":
    asyncio.run(run())
