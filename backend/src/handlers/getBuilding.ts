import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { getPool } from '../lib/db';
import { ok, badRequest, notFound, serverError } from '../lib/response';

/** GET /building/{id} */
export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const raw = event.pathParameters?.id;
  const id = Number(raw);
  if (!raw || Number.isNaN(id)) return badRequest('id must be an integer');

  try {
    const pool = await getPool();
    const { rows } = await pool.query(
      `SELECT id, district, ward, lat, lon, damage_group AS "damageGroup"
         FROM v_locations
        WHERE id = $1
        LIMIT 1`,
      [id],
    );
    if (rows.length === 0) return notFound('Building not found');
    return ok(rows[0]);
  } catch (err) {
    console.error('getBuilding failed', err);
    return serverError('Could not fetch building');
  }
};
