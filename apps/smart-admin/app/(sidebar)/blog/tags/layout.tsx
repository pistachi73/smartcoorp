import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

export const metadata = {
  title: 'Smartcoorp Post Tag',
  description: ' View and Manage smartcoorp post tag.',
};

const PostTagLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Headline as="h1" size="xxxlarge" noMargin>
        Smartcoorp Post Tag
      </Headline>
      <Body variant="neutral" size="small">
        View and Manage smartcoorp post tag.
      </Body>
      {children}
    </>
  );
};

export default PostTagLayout;
