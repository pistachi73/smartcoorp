import { MainLayoutWrapper } from '@smart-editor/components/main-layout-wrapper';

export const metadata = {
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo_light_ico.svg',
        href: '/logo_light_ico.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo_drak_ico.svg',
        href: '/logo_drak_ico.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
