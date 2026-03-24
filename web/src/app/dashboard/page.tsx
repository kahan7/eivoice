import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_TOKEN_COOKIE } from '../../lib/auth/keycloak';
import { decodeJwtPayload } from '../../lib/auth/session';

function toDateTimeText(epochSeconds?: number): string {
  if (!epochSeconds) {
    return 'Unknown';
  }

  return new Date(epochSeconds * 1000).toLocaleString();
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    redirect('/');
  }

  const payload = decodeJwtPayload(accessToken);
  const displayName = payload?.name || payload?.preferred_username || payload?.email || 'Unknown user';

  return (
    <main className="dashboard-shell">
      <section className="aurora" aria-hidden="true" />
      <section className="panel">
        <p className="eyebrow">Authenticated Session</p>
        <h1>Welcome, {displayName}</h1>
        <p className="subtitle">
          Your Keycloak login is active. This page is rendered on the server from secure cookies.
        </p>

        <div className="user-grid">
          <article className="datum">
            <p>Username</p>
            <p>{payload?.preferred_username ?? 'N/A'}</p>
          </article>
          <article className="datum">
            <p>Email</p>
            <p>{payload?.email ?? 'N/A'}</p>
          </article>
          <article className="datum">
            <p>Token Expires At</p>
            <p>{toDateTimeText(payload?.exp)}</p>
          </article>
          <article className="datum">
            <p>Realm Session</p>
            <p>Connected via OpenID Connect</p>
          </article>
        </div>

        <div className="actions">
          <Link href="/api/auth/logout" className="primary-cta">
            Logout from Keycloak
          </Link>
          <Link href="/" className="secondary-cta">
            Back to login page
          </Link>
        </div>
      </section>
    </main>
  );
}
