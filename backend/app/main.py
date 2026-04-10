from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, profiles, charts, numerology, interpretations, insights, waitlist

app = FastAPI(title="AstroAI API", version="1.0.0")

# Set up CORS for the Next.js frontend
origins = [
    "http://localhost:3000",
    "http://localhost:5180",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(profiles.router, prefix="/profiles", tags=["Profiles"])
app.include_router(charts.router, prefix="/charts", tags=["Charts"])
app.include_router(numerology.router, prefix="/numerology", tags=["Numerology"])
app.include_router(interpretations.router, prefix="/interpretations", tags=["AI Interpretations"])
app.include_router(insights.router, prefix="/insights", tags=["Daily Insights"])
app.include_router(waitlist.router, prefix="/waitlist", tags=["Waitlist"])

@app.get("/")
async def root():
    return {"message": "Ancient wisdom. Modern clarity. AstroAI API is live."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
