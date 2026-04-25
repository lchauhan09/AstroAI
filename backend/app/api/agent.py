from fastapi import APIRouter, Request, HTTPException
from app.services.agent_bridge import node_agent

router = APIRouter()

@router.post("/analyze")
async def analyze(request: Request):
    try:
        body = await request.json()
        text = body.get("text")
        
        if not text:
            raise HTTPException(status_code=400, detail="Text is required")
            
        result = await node_agent.run("analysis", {"text": text})
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
            
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
