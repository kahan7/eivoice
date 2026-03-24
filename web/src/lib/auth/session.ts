import { NextResponse } from 'next/server';
import {
  ACCESS_TOKEN_COOKIE,
  ID_TOKEN_COOKIE,
  KC_STATE_COOKIE,
  KeycloakTokenResponse,
  REFRESH_TOKEN_COOKIE,
} from './keycloak';

function cookieBaseOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export function setKeycloakStateCookie(response: NextResponse, state: string): void {
  response.cookies.set(KC_STATE_COOKIE, state, cookieBaseOptions(10 * 60));
}

export function clearKeycloakStateCookie(response: NextResponse): void {
  response.cookies.delete(KC_STATE_COOKIE);
}

export function applyAuthCookies(response: NextResponse, tokens: KeycloakTokenResponse): void {
  response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.access_token, cookieBaseOptions(tokens.expires_in));

  if (tokens.refresh_token && tokens.refresh_expires_in) {
    response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, cookieBaseOptions(tokens.refresh_expires_in));
  }

  if (tokens.id_token) {
    response.cookies.set(ID_TOKEN_COOKIE, tokens.id_token, cookieBaseOptions(tokens.expires_in));
  }
}

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);
  response.cookies.delete(ID_TOKEN_COOKIE);
  response.cookies.delete(KC_STATE_COOKIE);
}

export type DecodedJwtPayload = {
  preferred_username?: string;
  email?: string;
  name?: string;
  exp?: number;
  [key: string]: unknown;
};

export function decodeJwtPayload(token: string): DecodedJwtPayload | null {
  const parts = token.split('.');

  if (parts.length < 2) {
    return null;
  }

  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const normalized = payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), '=');
    const decoded = Buffer.from(normalized, 'base64').toString('utf-8');
    return JSON.parse(decoded) as DecodedJwtPayload;
  } catch {
    return null;
  }
}
