import { Pool } from 'pg';
import { getDbSecret } from './secrets';

let pool: Pool | null = null; // survives warm invocations -> avoids per-request connect cost

/** Lazily build a pooled pg client from Secrets Manager credentials. */
export async function getPool(): Promise<Pool> {
  if (pool) return pool;
  const s = await getDbSecret();
  pool = new Pool({
    host: s.host,
    port: s.port,
    database: s.dbname,
    user: s.username,
    password: s.password,
    ssl: { rejectUnauthorized: false }, // RDS in-transit TLS
    max: 1, // Lambda: one connection per container
    idleTimeoutMillis: 30_000,
  });
  return pool;
}
