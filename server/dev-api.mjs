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
    const { user_name, course_id } = req.body ?? {};
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
    await db.execute({
      sql: 'INSERT INTO completions (id, user_name, course_id) VALUES (?, ?, ?)',
      args: [id, user_name.trim(), course_id.trim()],
    });

    return res.json({ id });
  } catch (err) {
    console.error('POST /api/issue', err);
    return res.status(500).json({ error: 'Failed to record completion' });
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
