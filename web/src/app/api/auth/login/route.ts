import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { buildAuthorizeUrl } from '../../../../lib/auth/keycloak';
import { setKeycloakStateCookie } from '../../../../lib/auth/session';

export async function GET() {
  const state = randomUUID();
  const authorizeUrl = buildAuthorizeUrl(state);
  const response = NextResponse.redirect(authorizeUrl);

  setKeycloakStateCookie(response, state);

  return response;
}
