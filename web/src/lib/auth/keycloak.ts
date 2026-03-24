import 'server-only';

export const ACCESS_TOKEN_COOKIE = 'ei_access_token';
export const REFRESH_TOKEN_COOKIE = 'ei_refresh_token';
export const ID_TOKEN_COOKIE = 'ei_id_token';
export const KC_STATE_COOKIE = 'ei_kc_state';

export type KeycloakTokenResponse = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in?: number;
  scope?: string;
};

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getAppUrl(): string {
  return required('NEXT_PUBLIC_APP_URL').replace(/\/$/, '');
}

export function getKeycloakConfig() {
  const host = required('KEYCLOAK_HOST').replace(/\/$/, '');
  const realm = required('KEYCLOAK_REALM');
  const clientId = required('KEYCLOAK_CLIENT_ID');
  const clientSecret = required('KEYCLOAK_CLIENT_SECRET');

  return {
    host,
    realm,
    clientId,
    clientSecret,
    issuer: `${host}/realms/${realm}`,
    authEndpoint: `${host}/realms/${realm}/protocol/openid-connect/auth`,
    tokenEndpoint: `${host}/realms/${realm}/protocol/openid-connect/token`,
    logoutEndpoint: `${host}/realms/${realm}/protocol/openid-connect/logout`,
  };
}

export function buildAuthorizeUrl(state: string): string {
  const cfg = getKeycloakConfig();
  const callbackUrl = `${getAppUrl()}/api/auth/callback`;
  const url = new URL(cfg.authEndpoint);

  url.searchParams.set('client_id', cfg.clientId);
  url.searchParams.set('redirect_uri', callbackUrl);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid profile email');
  url.searchParams.set('state', state);

  return url.toString();
}

export function buildLogoutUrl(idTokenHint?: string): string {
  const cfg = getKeycloakConfig();
  const url = new URL(cfg.logoutEndpoint);
  const postLogout = getAppUrl();

  url.searchParams.set('client_id', cfg.clientId);
  url.searchParams.set('post_logout_redirect_uri', postLogout);

  if (idTokenHint) {
    url.searchParams.set('id_token_hint', idTokenHint);
  }

  return url.toString();
}

export async function exchangeCodeForToken(code: string): Promise<KeycloakTokenResponse> {
  const cfg = getKeycloakConfig();
  const callbackUrl = `${getAppUrl()}/api/auth/callback`;
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
    redirect_uri: callbackUrl,
  });

  const response = await fetch(cfg.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed with status ${response.status}`);
  }

  return (await response.json()) as KeycloakTokenResponse;
}
