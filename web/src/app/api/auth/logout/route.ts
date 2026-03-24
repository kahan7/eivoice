import { NextRequest, NextResponse } from 'next/server';
import { buildLogoutUrl, ID_TOKEN_COOKIE } from '../../../../lib/auth/keycloak';
import { clearAuthCookies } from '../../../../lib/auth/session';

export async function GET(request: NextRequest) {
  const idToken = request.cookies.get(ID_TOKEN_COOKIE)?.value;
  const response = NextResponse.redirect(buildLogoutUrl(idToken));

  clearAuthCookies(response);

  return response;
}
