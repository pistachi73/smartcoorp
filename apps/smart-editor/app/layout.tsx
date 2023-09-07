import { Footer } from '@smart-editor/components/footer/footer';
import { Header } from '@smart-editor/components/header';
import { MainLayoutWrapper } from '@smart-editor/components/main-layout-wrapper';
import { getHeaders } from '@smart-editor/utils/get-headers';

import { DeviceOnlyProvider } from '@smartcoorp/ui/device-only';

export const metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { deviceType } = getHeaders();
  return (
    <html lang="en">
      <body>
        <MainLayoutWrapper>
          <DeviceOnlyProvider deviceType={deviceType}>
            <Header />
            <div style={{ minHeight: 'calc(100vh - 200px)' }}>{children}</div>
            <Footer />
          </DeviceOnlyProvider>
        </MainLayoutWrapper>
      </body>
    </html>
  );
}
