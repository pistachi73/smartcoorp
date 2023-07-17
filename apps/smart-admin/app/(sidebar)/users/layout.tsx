import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

export const metadata = {
  title: 'Smartcoorp Users',
  description: 'View and Manage smartcoorp users.',
};

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Headline as="h1" size="xxxlarge" noMargin>
        Smartcoorp Users
      </Headline>
      <Body variant="neutral" size="small">
        View and Manage smartcoorp users.
      </Body>
      <Body>Vercel URL: {process.env.VERCEL_URL ?? 'localhost'}</Body>
      {children}
    </>
  );
};

export default UsersLayout;
