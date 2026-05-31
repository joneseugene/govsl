import type { Metadata } from 'next';
import Providers from '@/provider/react_query';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gov SL',
  description: 'Government of Sierra Leone Official Media Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
