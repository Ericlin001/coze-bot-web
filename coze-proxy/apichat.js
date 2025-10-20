export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { bot_id, token, input } = req.body;

    const response = await fetch("https://api.coze.cn/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bot_id,
        user_id: "web_user_" + Math.random().toString(36).substring(2, 8),
        input,
        stream: false,
      }),
    });

    const data = await response.json();
    res.status(200).json({ output: data.output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
