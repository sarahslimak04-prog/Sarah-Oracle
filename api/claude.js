export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Prompt manquant" });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: "Tu es Séraphiel, oracle mystique bienveillant. Tu vouvoies toujours.", messages: [{ role: "user", content: prompt }] }),
  });
  const data = await response.json();
  return res.status(200).json({ text: data.content?.[0]?.text || "Les étoiles gardent silence..." });
}
