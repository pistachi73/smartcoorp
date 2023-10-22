import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';

import { CodeBlockIcons } from './code-block-icons';
import { CodeBlockContainer } from './code-block.styles';

export const CodeBlock = ({ code }: { code: string }) => {
  return (
    <CodeBlockContainer>
      <CodeBlockIcons code={code} />
      <MDXRemote
        source={code}
        options={{
          mdxOptions: { rehypePlugins: [rehypePrism] },
        }}
      />
    </CodeBlockContainer>
  );
};
