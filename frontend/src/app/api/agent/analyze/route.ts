import { agent } from "@lokesh/agent-core";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const result = await agent.runWorkflow("analysis", { text });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Agent API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
