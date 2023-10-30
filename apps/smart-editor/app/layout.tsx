import { MainLayoutWrapper } from '@smart-editor/components/main-layout-wrapper/main-layout-wrapper';
import { getHeaders } from '@smart-editor/utils/get-headers';

import { Inter } from 'next/font/google';

import { DeviceOnlyProvider } from '@smartcoorp/ui/device-only';

export const metadata = {
  title: 'SmartEditor: Content to JSON',
  description: 'SmartEditor',
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
