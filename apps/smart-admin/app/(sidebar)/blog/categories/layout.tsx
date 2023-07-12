import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

export const metadata = {
  title: 'Smartcoorp Post Categories',
  description: ' View and Manage smartcoorp post categories.',
};

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Headline as="h1" size="xxxlarge" noMargin>
        Smartcoorp Post Categories
      </Headline>
      <Body variant="neutral" size="small">
        View and Manage smartcoorp post categories.
      </Body>
      {children}
    </>
  );
};

export default UsersLayout;
