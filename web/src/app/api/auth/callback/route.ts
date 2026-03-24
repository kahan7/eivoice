import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken, getAppUrl, KC_STATE_COOKIE } from '../../../../lib/auth/keycloak';
import { applyAuthCookies, clearKeycloakStateCookie } from '../../../../lib/auth/session';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const error = request.nextUrl.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${getAppUrl()}/?error=keycloak_error`);
  }

  if (!code) {
    return NextResponse.redirect(`${getAppUrl()}/?error=missing_code`);
  }

  const stateFromCookie = request.cookies.get(KC_STATE_COOKIE)?.value;

  if (!state || !stateFromCookie || state !== stateFromCookie) {
    return NextResponse.redirect(`${getAppUrl()}/?error=invalid_state`);
  }

  try {
    const tokenSet = await exchangeCodeForToken(code);
    const response = NextResponse.redirect(`${getAppUrl()}/dashboard`);

    applyAuthCookies(response, tokenSet);
    clearKeycloakStateCookie(response);

    return response;
  } catch {
    return NextResponse.redirect(`${getAppUrl()}/?error=token_exchange_failed`);
  }
}
