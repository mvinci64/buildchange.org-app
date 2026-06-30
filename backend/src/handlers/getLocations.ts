import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { getPool } from '../lib/db';
import { ok, badRequest, serverError } from '../lib/response';

const AOI = { minLon: 81.9261, maxLon: 82.5596, minLat: 28.4636, maxLat: 28.8131 };

/** GET /locations?damageGroup=N */
export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const raw = event.queryStringParameters?.damageGroup;
  const damageGroup = Number(raw);
  if (!raw || Number.isNaN(damageGroup) || damageGroup < 1 || damageGroup > 4) {
    return badRequest('damageGroup must be an integer 1–4');
  }

  try {
    const pool = await getPool();
    // Parameterized query — NEVER string-concatenate user input.
    const { rows } = await pool.query(
      `SELECT id, district, ward, lat, lon, damage_group AS "damageGroup"
         FROM v_locations
        WHERE damage_group = $1
          AND lon BETWEEN $2 AND $3
          AND lat BETWEEN $4 AND $5
        ORDER BY district, ward`,
      [damageGroup, AOI.minLon, AOI.maxLon, AOI.minLat, AOI.maxLat],
    );
    return ok(rows);
  } catch (err) {
    console.error('getLocations failed', err);
    return serverError('Could not fetch locations');
  }
};
