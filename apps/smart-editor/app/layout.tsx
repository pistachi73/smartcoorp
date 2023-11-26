import { MainLayoutWrapper } from '@smart-editor/components/main-layout-wrapper/main-layout-wrapper';
import { getHeaders } from '@smart-editor/utils/get-headers';
import { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { DeviceOnlyProvider } from '@smartcoorp/ui/device-only';

export const metadata: Metadata = {
  openGraph: {
    title: 'SmartEditor - Transition from words to JSON-powered content.',
    description:
      'SmartEditor is a powerful tool that allows you to effortlessly write and organize content, and then export it as JSON.',
    url: 'https://smarteditor.app',
    siteName: 'SmartEditor',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://smarteditor.app/og_image.png',
        width: 1200,
        height: 630,
        alt: 'SmartEditor',
      },
    ],
  },
  authors: [
    {
      name: 'Oscar Pulido Castillo',
      url: 'https://www.linkedin.com/in/oscar-pulido-castillo/',
    },
  ],
  keywords: [
    'SmartEditor',
    'JSON content',
    'JSON export',
    'content to JSON',
    'writing tool',
    'editor',
    'blog post editor',
  ],
  creator: 'Oscar Pulido Castillo',
  publisher: 'Oscar Pulido Castillo',
  viewport: 'width=device-width, initial-scale=1.0',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        href: '/fav-icons/light-favicon.ico',
        url: '/fav-icons/light-favicon.ico',
        rel: 'icon',
        sizes: 'any',
      },
      {
        media: '(prefers-color-scheme: light)',
        href: '/fav-icons/light-favicon.svg',
        url: '/fav-icons/light-favicon.svg',
        type: 'image/svg+xml',
        rel: 'icon',
      },
      {
        media: '(prefers-color-scheme: dark)',
        href: '/fav-icons/dark-favicon.ico',
        url: '/fav-icons/dark-favicon.ico',
        rel: 'icon',
        sizes: 'any',
      },
      {
        media: '(prefers-color-scheme: dark)',
        href: '/fav-icons/dark-favicon.svg',
        url: '/fav-icons/dark-favicon.svg',
        type: 'image/svg+xml',
        rel: 'icon',
      },
    ],
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { deviceType } = getHeaders();
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayoutWrapper>
          <DeviceOnlyProvider deviceType={deviceType}>
            {children}
          </DeviceOnlyProvider>
        </MainLayoutWrapper>
      </body>
    </html>
  );
}
