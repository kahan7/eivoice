import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_TOKEN_COOKIE } from '../lib/auth/keycloak';

type HomeProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

const errorMessageMap: Record<string, string> = {
  invalid_state: 'Login session expired. Please login again.',
  missing_code: 'Keycloak did not return an authorization code.',
  token_exchange_failed: 'Could not exchange authorization code for tokens.',
  keycloak_error: 'Keycloak returned an error while authenticating.',
};

export default async function Home({ searchParams }: HomeProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (accessToken) {
    redirect('/dashboard');
  }

  const resolvedSearchParams = await searchParams;
  const errorCode = resolvedSearchParams?.error;
  const errorMessage = errorCode ? errorMessageMap[errorCode] ?? 'Unexpected authentication error.' : null;

  return (
    <main className="auth-shell">
      <section className="aurora" aria-hidden="true" />
      <article className="glass-card">
        <p className="eyebrow">EI Voice Platform</p>
        <h1>Sign in with Keycloak</h1>
        <p className="subtitle">Secure access for internal management, product, and invoice services.</p>

        {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

        <Link href="/api/auth/login" className="primary-cta">
          Continue with Keycloak
        </Link>

        <div className="meta-grid">
          <p>Stack: Next.js App Router</p>
          <p>Session: HttpOnly cookies</p>
          <p>Protocol: OAuth2/OIDC code flow</p>
        </div>
      </article>
    </main>
  );
}
