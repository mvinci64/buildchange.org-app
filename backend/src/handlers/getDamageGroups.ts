import type { APIGatewayProxyResultV2 } from 'aws-lambda';
import { ok } from '../lib/response';
import { DAMAGE_GROUPS } from '../lib/damage';

/** GET /damagegroups — static list of groups and labels. */
export const handler = async (): Promise<APIGatewayProxyResultV2> => ok(DAMAGE_GROUPS);
