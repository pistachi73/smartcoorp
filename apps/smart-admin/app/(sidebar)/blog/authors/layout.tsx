import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

export const metadata = {
  title: 'Smartcoorp Post Authors',
  description: ' View and Manage smartcoorp post authors.',
};

const PostAuthorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Headline as="h1" size="xxxlarge" noMargin>
        Smartcoorp Post Authors
      </Headline>
      <Body variant="neutral" size="small">
        View and Manage smartcoorp post authors.
      </Body>
      {children}
    </>
  );
};

export default PostAuthorsLayout;
