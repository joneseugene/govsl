import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import Providers from '@/provider/react_query';
import './globals.css';
import OrganizationSchema from '@/components/SEO/OrganizationSchema';

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
  metadataBase: new URL("https://info.gov.sl"),

  title: {
    default: "Gov SL | Official Government of Sierra Leone",
    template: "%s | Gov SL",
  },

  description:
    "Official Government of Sierra Leone information portal providing government news, ministries, public services, publications, reports, announcements and national updates.",

  applicationName: "Gov SL",

  publisher: "Government of Sierra Leone",

  category: "Government",

  alternates: {
    canonical: "/",
  },

  authors: [
    {
      name: "Directorate of Science, Technology and Innovation",
      url: "https://info.gov.sl",
    },
  ],

  creator: "Directorate of Science, Technology and Innovation",

  keywords: [
    "Government of Sierra Leone",
    "Gov SL",
    "Official Government",
    "Sierra Leone",
    "Government News",
    "Ministries",
    "Government Services",
    "Press Releases",
    "Reports",
    "Publications",
    "Announcements",
    "DSTI",
    "MOCTI",
    "info.gov.sl",
  ],

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favIcon.ico",
    shortcut: "/favIcon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    url: "https://info.gov.sl",
    siteName: "Gov SL",
    locale: "en_US",

    title: "Gov SL | Official Government of Sierra Leone",

    description:
      "Official Government of Sierra Leone information portal.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Government of Sierra Leone",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gov SL | Official Government of Sierra Leone",

    description:
      "Official Government of Sierra Leone information portal.",

    images: ["/og-image.jpg"],
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
        <OrganizationSchema />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
