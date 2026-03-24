import './global.scss';
import { Fraunces, Space_Grotesk } from 'next/font/google';

export const metadata = {
  title: 'EI Voice Portal',
  description: 'Frontend portal with Keycloak login flow',
};

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
