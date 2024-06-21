import type { Metadata } from 'next';
import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: 'Discover Discovery',
  description: 'Discover Discovery',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <head>
        <link rel="dns-prefetch" href="https://de-api.loma-cms.com/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
