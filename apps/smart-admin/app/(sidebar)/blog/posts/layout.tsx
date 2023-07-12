import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

export const metadata = {
  title: 'Smartcoorp Blog Posts',
  description: 'View and Manage smartcoorp blog posts.',
};

const BlogPostsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Headline as="h1" size="xxxlarge" noMargin>
        Smartcoorp Blog Posts
      </Headline>
      <Body variant="neutral" size="small">
        View and Manage smartcoorp blog posts.
      </Body>
      {children}
    </>
  );
};

export default BlogPostsLayout;
