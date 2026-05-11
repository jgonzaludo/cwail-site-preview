import { createClient } from '@libsql/client';
import { randomBytes } from 'crypto';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

dotenv.config({ path: join(root, '.env.local') });
dotenv.config({ path: join(root, '.env') });

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

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

function rowToObject(row, columns) {
  if (!row) return null;
  if (typeof row === 'object' && !Array.isArray(row) && row.user_name !== undefined) {
    return row;
  }
  const obj = {};
  if (columns?.length && Array.isArray(row)) {
    columns.forEach((c, i) => {
      obj[c] = row[i];
    });
    return obj;
  }
  return row;
}

app.post('/api/issue', async (req, res) => {
  try {
    const body = req.body;
    if (body == null || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ error: 'Expected JSON body with user_name and course_id' });
    }
    const { user_name, course_id } = body;
    if (
      typeof user_name !== 'string' ||
      typeof course_id !== 'string' ||
      !user_name.trim() ||
      !course_id.trim()
    ) {
      return res.status(400).json({ error: 'user_name and course_id are required' });
    }

    const id = randomBytes(5).toString('hex');
    const db = getDb();
    const result = await db.execute({
      sql: 'INSERT INTO completions (id, user_name, course_id) VALUES (?, ?, ?) RETURNING id, created_at',
      args: [id, user_name.trim(), course_id.trim()],
    });

    const columns = result.columns ?? [];
    const rawRow = result.rows[0];
    const row = rowToObject(rawRow, columns);
    const outId = row?.id != null ? String(row.id) : id;
    const issuedAt = row?.created_at != null ? String(row.created_at) : '';

    return res.json({ id: outId.toLowerCase(), issued_at: issuedAt });
  } catch (err) {
    console.error('POST /api/issue', err);
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      error: 'Failed to record completion',
      details: message,
    });
  }
});

app.post('/api/responses', async (req, res) => {
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

    const user_name =
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
      args: [session_key.trim(), section_id, user_name, response_text.trim(), ai_disclosure.trim(), other],
    });

    return res.json({ ok: true, section_id });
  } catch (err) {
    console.error('POST /api/responses', err);
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      error: 'Failed to save response',
      details: message,
    });
  }
});

app.get('/api/verify/:id', async (req, res) => {
  try {
    const id = String(req.params.id ?? '').toLowerCase();
    if (!/^[a-f0-9]{10}$/.test(id)) {
      return res.status(404).json({ error: 'not_found' });
    }

    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT id, user_name, course_id, created_at FROM completions WHERE id = ?',
      args: [id],
    });

    const columns = result.columns ?? [];
    const rawRow = result.rows[0];
    const row = rowToObject(rawRow, columns);
    if (!row) {
      return res.status(404).json({ error: 'not_found' });
    }

    return res.json({
      id: String(row.id ?? id),
      user_name: String(row.user_name ?? ''),
      course_id: String(row.course_id ?? ''),
      created_at: row.created_at != null ? String(row.created_at) : '',
    });
  } catch (err) {
    console.error('GET /api/verify', err);
    return res.status(500).json({ error: 'server_error' });
  }
});

const PORT = Number(process.env.API_PORT) || 3001;
if (!existsSync(join(root, '.env.local')) && !process.env.TURSO_DATABASE_URL) {
  console.warn('[api] No .env.local found — set TURSO_DATABASE_URL before issuing certificates.');
}

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
