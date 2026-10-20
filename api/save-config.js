import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  try {
    const body = req.body;

    // Update the config in Supabase
    const { data, error } = await supabase
      .from('site_config')
      .update({ config: body })
      .eq('id', 1)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Config saved to Supabase'
    });
  } catch (error) {
    console.error('Save error:', error);
    return res.status(500).json({ error: error.message });
  }
}
