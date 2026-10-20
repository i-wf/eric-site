import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(404).end();
  }

  try {
    // Fetch config from Supabase
    const { data, error } = await supabase
      .from('site_config')
      .select('config')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data?.config || {});
  } catch (error) {
    console.error('Get error:', error);
    return res.status(500).json({ error: error.message });
  }
}
