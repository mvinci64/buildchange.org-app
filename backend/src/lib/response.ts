const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: CORS,
  body: JSON.stringify(body),
});

export const ok = (b: unknown) => json(200, b);
export const badRequest = (m: string) => json(400, { message: m });
export const notFound = (m: string) => json(404, { message: m });
export const serverError = (m: string) => json(500, { message: m });
