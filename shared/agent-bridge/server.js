const express = require('express');
const { agent } = require('@lokesh/agent-core');

const app = express();
app.use(express.json());

const PORT = process.env.AGENT_PORT || 5001;

app.post('/run', async (req, res) => {
  const { workflow, input } = req.body;
  try {
    const result = await agent.runWorkflow(workflow, input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Agent Bridge running on port ${PORT}`);
});
