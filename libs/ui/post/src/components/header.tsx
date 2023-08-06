import DOMPurify from 'dompurify';
import { HeaderBlockProps } from 'libs/ui/post-editor/src/post-editor.types';
import { styled } from 'styled-components';

import { Headline, HeadlineSize } from '@smartcoorp/ui/headline';
import { spaceXL } from '@smartcoorp/ui/tokens';

const headerLevelMapping: Record<
  1 | 2 | 3 | 4 | 5 | 6,
  {
    size: HeadlineSize;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
> = {
  1: {
    size: 'xxxlarge',
    tag: 'h1',
  },
  2: {
    size: 'xxlarge',
    tag: 'h2',
  },
  3: {
    size: 'xlarge',
    tag: 'h3',
  },
  4: {
    size: 'large',
    tag: 'h4',
  },
  5: {
    size: 'medium',
    tag: 'h5',
  },
  6: {
    size: 'small',
    tag: 'h6',
  },
};

const StyledHeadling = styled(Headline)`
  padding-top: ${spaceXL};
`;

export const Header = ({ data, id }: HeaderBlockProps) => {
  const { level, text } = data;

  const { size, tag } = headerLevelMapping[level];

  const purifiedText = DOMPurify.sanitize(text);

  if (!purifiedText) return null;
  return (
    <StyledHeadling
      size={size}
      as={tag}
      id={id}
      dangerouslySetInnerHTML={{ __html: purifiedText }}
    />
  );
};
