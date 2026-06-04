import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import Providers from '@/provider/react_query';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://info.gov.sl'),

  title: {
    default: 'Gov SL',
    template: '%s | Government of Sierra Leone',
  },

  description: 'Government of Sierra Leone Official Media Platform',

  keywords: [
    'gov.sl',
    'info.gov.sl',
    'GoSL',
    'Government of Sierra Leone',
    'DSTI',
    'MOCTI',
    'Sierra Leone',
    'Publications',
    'News',
    'Reports',
    'MDA',
    'Services',
    'Announcements',
  ],

  authors: [{ name: 'Directorate of Science, Technology and Innovation' }],

  creator: 'Directorate of Science, Technology and Innovation',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://info.gov.sl',
    siteName: 'Gov SL',
    title: 'Gov SL',
    description: 'Government of Sierra Leone Official Media Platform',

    twitter: {
      card: 'summary_large_image',
      title: 'Gov SL',
      description: 'Government of Sierra Leone Official Media Platform',
    },

    robots: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
