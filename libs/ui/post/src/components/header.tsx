import DOMPurify from 'dompurify';
import { HeaderBlockProps } from 'libs/ui/post-editor/src/post-editor.types';
import { styled } from 'styled-components';

import { Col, Row } from '@smartcoorp/ui/grid';
import { Headline, HeadlineSize } from '@smartcoorp/ui/headline';
import { mediaConfined, mediaSmall, spaceXL } from '@smartcoorp/ui/tokens';

const headerLevelMapping: Record<
  1 | 2 | 3 | 4 | 5 | 6,
  {
    size: HeadlineSize;
    sizeConfined: HeadlineSize;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
> = {
  1: {
    size: 'xxlarge',
    sizeConfined: 'xxxlarge',
    tag: 'h1',
  },
  2: {
    size: 'xlarge',
    sizeConfined: 'xxlarge',
    tag: 'h2',
  },
  3: {
    size: 'large',
    sizeConfined: 'xlarge',
    tag: 'h3',
  },
  4: {
    size: 'medium',
    sizeConfined: 'large',
    tag: 'h4',
  },
  5: {
    size: 'medium',
    sizeConfined: 'medium',
    tag: 'h5',
  },
  6: {
    size: 'small',
    sizeConfined: 'small',
    tag: 'h6',
  },
};

const StyledHeadling = styled(Headline)`
  padding-top: ${spaceXL};

  width: 100%;
  margin: 0 auto;

  @media ${mediaSmall} {
    width: 90%;
  }

  @media ${mediaConfined} {
    width: 80%;

    &:first-child {
      padding-top: 0;
    }
  }
`;

export const Header = ({ data, id }: HeaderBlockProps) => {
  const { level, text } = data;

  const { size, sizeConfined, tag } = headerLevelMapping[level];

  const purifiedText = DOMPurify.sanitize(text);

  if (!purifiedText) return null;
  return (
    <StyledHeadling
      size={size}
      sizeConfined={sizeConfined}
      forwardedAs={tag}
      id={id}
      dangerouslySetInnerHTML={{ __html: purifiedText }}
    />
  );
};
