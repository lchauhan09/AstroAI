import httpx
import os

AGENT_BRIDGE_URL = os.getenv("AGENT_BRIDGE_URL", "http://localhost:5001")

class NodeAgent:
    async def run(self, workflow: str, input_data: dict):
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{AGENT_BRIDGE_URL}/run",
                    json={"workflow": workflow, "input": input_data},
                    timeout=30.0
                )
                response.raise_for_status()
                return response.json()
            except Exception as e:
                return {"error": str(e)}

node_agent = NodeAgent()
