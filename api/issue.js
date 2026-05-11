import { createClient } from '@libsql/client';
import { randomBytes } from 'crypto';

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

function rowToObject(row, columns = []) {
  if (!row) return null;
  if (typeof row === 'object' && !Array.isArray(row) && row.user_name !== undefined) {
    return row;
  }
  if (Array.isArray(row) && columns.length) {
    return Object.fromEntries(columns.map((column, index) => [column, row[index]]));
  }
  return row;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

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

    const row = rowToObject(result.rows[0], result.columns ?? []);
    const outId = row?.id != null ? String(row.id) : id;
    const issuedAt = row?.created_at != null ? String(row.created_at) : '';

    return res.status(200).json({ id: outId.toLowerCase(), issued_at: issuedAt });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      error: 'Failed to record completion',
      details: message,
    });
  }
}
