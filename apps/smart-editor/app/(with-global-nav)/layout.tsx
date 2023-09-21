import { Footer } from '@smart-editor/components/global-navigation/footer';
import { Header } from '@smart-editor/components/global-navigation/header';

const WithGlobalNavLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default WithGlobalNavLayout;
