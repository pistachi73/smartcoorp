import { MainLayoutWrapper } from '@smart-editor/components/main-layout-wrapper/main-layout-wrapper';
import { getHeaders } from '@smart-editor/utils/get-headers';
import { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { DeviceOnlyProvider } from '@smartcoorp/ui/device-only';

export const metadata: Metadata = {
  openGraph: {
    title: 'SmartEditor - Transition from words to JSON-powered content.',
    description:
      "Smarteditor is a powerful tool that allows you to effortlessly write and organize content, and then export it as JSON. Enhance your content creation process with Smarteditor's user-friendly interface and robust export capabilities.",
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
        url: '/logo_light.svg',
        href: '/logo_light.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo_dark.svg',
        href: '/logo_dark.svg',
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
