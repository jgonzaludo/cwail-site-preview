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
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  try {
    const id = String(req.query.id ?? '').toLowerCase();
    if (!/^[a-f0-9]{10}$/.test(id)) {
      return res.status(404).json({ error: 'not_found' });
    }

    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT id, user_name, course_id, created_at FROM completions WHERE id = ?',
      args: [id],
    });

    const row = rowToObject(result.rows[0], result.columns ?? []);
    if (!row) {
      return res.status(404).json({ error: 'not_found' });
    }

    return res.status(200).json({
      id: String(row.id ?? id),
      user_name: String(row.user_name ?? ''),
      course_id: String(row.course_id ?? ''),
      created_at: row.created_at != null ? String(row.created_at) : '',
    });
  } catch {
    return res.status(500).json({ error: 'server_error' });
  }
}
