export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(404).end();
  }

  try {
    // For Vercel deployment, fetch from database or KV store
    // return res.status(200).json(configFromDB);

    // For now, return default config
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
