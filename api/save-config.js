export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  try {
    const body = req.body;

    // For Vercel deployment, we need to use a database or KV store
    // since the file system is read-only in production

    // Option 1: Use Vercel KV (Redis)
    // await kv.set('site-config', JSON.stringify(body));

    // Option 2: Use Vercel Postgres
    // await sql`INSERT INTO config (data) VALUES (${JSON.stringify(body)})`;

    // Option 3: Use external database (Supabase, MongoDB, etc.)

    // For now, just return success (no persistence on Vercel without DB)
    return res.status(200).json({
      success: true,
      message: 'Config received (Note: Add database for actual persistence on Vercel)'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
