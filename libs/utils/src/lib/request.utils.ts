import { parseToken } from './string.utils';

export function getAccessToken(req: any, keepBearer = false): string {
  const token = req.headers?.['authorization'];

  return keepBearer ? token : parseToken(token);
}
