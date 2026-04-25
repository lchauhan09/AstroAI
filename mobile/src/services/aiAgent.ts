const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8000";

export const runAITest = async (text: string = "Hello from mobile") => {
  try {
    const response = await fetch(`${API_URL}/agent/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    console.log("Agent Result from Backend:", data);
    return data;
  } catch (error) {
    console.error("Agent Request Failed:", error);
    throw error;
  }
};
