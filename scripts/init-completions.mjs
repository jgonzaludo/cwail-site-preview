import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

dotenv.config({ path: join(root, '.env.local') });
dotenv.config({ path: join(root, '.env') });

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  console.error('Missing TURSO_DATABASE_URL');
  process.exit(1);
}

const client = createClient({
  url,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await client.execute(`
CREATE TABLE IF NOT EXISTS completions (
    id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    course_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

console.log('Turso schema ready: completions');
