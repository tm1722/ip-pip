import { Pool } from 'pg';

console.log('[DB] Attempting to connect to Postgres...');

export const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

db.connect()
  .then(() => {
    console.log('[DB] ✅ Successfully connected to the database.');
  })
  .catch((err) => {
    console.error('[DB] ❌ Failed to connect to the database:', err.message);
  });
