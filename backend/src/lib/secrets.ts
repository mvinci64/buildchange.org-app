import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

export type DbSecret = {
  host: string;
  port: number;
  dbname: string;
  username: string;
  password: string;
};

let cached: DbSecret | null = null; // reused across warm invocations

/** Fetch DB credentials from Secrets Manager. Never hardcode secrets (MUST). */
export async function getDbSecret(): Promise<DbSecret> {
  if (cached) return cached;
  const arn = process.env.DB_SECRET_ARN;
  if (!arn) throw new Error('DB_SECRET_ARN is not set');

  const client = new SecretsManagerClient({});
  const out = await client.send(new GetSecretValueCommand({ SecretId: arn }));
  if (!out.SecretString) throw new Error('Secret has no SecretString');

  cached = JSON.parse(out.SecretString) as DbSecret;
  return cached;
}
