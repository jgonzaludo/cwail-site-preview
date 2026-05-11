import { createClient } from '@libsql/client';

function getDb() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set');
  }

  return createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  try {
    const body = req.body;
    if (body == null || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ error: 'Expected JSON body' });
    }

    const {
      session_key,
      section_id,
      user_name: userNameRaw,
      response_text,
      ai_disclosure,
      other_explanation,
    } = body;

    if (typeof session_key !== 'string' || !session_key.trim()) {
      return res.status(400).json({ error: 'session_key is required' });
    }
    if (section_id !== 'conclusion') {
      return res.status(400).json({ error: 'Only section_id "conclusion" is supported' });
    }
    if (typeof response_text !== 'string' || !response_text.trim()) {
      return res.status(400).json({ error: 'response_text is required' });
    }
    if (typeof ai_disclosure !== 'string' || !ai_disclosure.trim()) {
      return res.status(400).json({ error: 'ai_disclosure is required' });
    }

    const userName =
      typeof userNameRaw === 'string' && userNameRaw.trim() ? userNameRaw.trim() : null;
    const other =
      typeof other_explanation === 'string' && other_explanation.trim() ?
        other_explanation.trim()
      : null;

    const db = getDb();
    await db.execute({
      sql: `INSERT INTO learner_responses (
          session_key, section_id, user_name, response_text, ai_disclosure, other_explanation, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(session_key, section_id) DO UPDATE SET
          user_name = excluded.user_name,
          response_text = excluded.response_text,
          ai_disclosure = excluded.ai_disclosure,
          other_explanation = excluded.other_explanation,
          updated_at = CURRENT_TIMESTAMP`,
      args: [
        session_key.trim(),
        section_id,
        userName,
        response_text.trim(),
        ai_disclosure.trim(),
        other,
      ],
    });

    return res.status(200).json({ ok: true, section_id });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      error: 'Failed to save response',
      details: message,
    });
  }
}
