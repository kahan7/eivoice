import { parseToken } from './string.utils';
import { AuthorizeResponse } from '@common/interfaces/tcp/authorizer';
import { MetaDataKeys } from '@common/constants/common.constant';
import { RequestWithMetadata } from '@common/interfaces/common/request.interface';

export function getAccessToken(req: RequestWithMetadata, keepBearer = false): string {
  const token = req.headers?.['authorization'];

  return keepBearer ? token : parseToken(token);
}
export function setUserData(req: RequestWithMetadata, userData?: AuthorizeResponse): void {
  req[MetaDataKeys.USER_DATA] = userData;
}
