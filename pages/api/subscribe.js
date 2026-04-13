export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, email, result } = req.body;

  if (!firstName || !email || !result) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const KIT_API_KEY = process.env.KIT_API_KEY;
  const KIT_FORM_ID = process.env.KIT_FORM_ID;

  if (!KIT_API_KEY || !KIT_FORM_ID) {
    console.error("Missing KIT_API_KEY or KIT_FORM_ID environment variables");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const kitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          first_name: firstName,
          email: email,
          fields: {
            soul_energy_type: result,
          },
          tags: [`soul-quiz`, `energy-type-${result}`],
        }),
      }
    );

    const data = await kitResponse.json();

    if (!kitResponse.ok) {
      console.error("Kit API error:", data);
      return res.status(502).json({ error: "Failed to subscribe to list" });
    }

    return res.status(200).json({ success: true, subscriber: data.subscription?.subscriber?.id });
  } catch (err) {
    console.error("Subscribe handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
