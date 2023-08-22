import DOMPurify from 'dompurify';
import { ParagraphBlockProps } from 'libs/ui/post-editor/src/post-editor.types';
import { styled } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Col, Row } from '@smartcoorp/ui/grid';
import { gray800, mediaConfined, spaceL } from '@smartcoorp/ui/tokens';

const StyledBody = styled(Body)`
  width: 100%;
  color: ${gray800};
  margin: ${spaceL} auto;

  @media ${mediaConfined} {
    width: 80%;
  }
`;

export const Paragraph = ({ data: { text }, id }: ParagraphBlockProps) => {
  const purifiedText = DOMPurify.sanitize(text);

  if (!purifiedText) return null;
  return (
    <StyledBody
      id={id}
      size="medium"
      lineHeight="increased"
      dangerouslySetInnerHTML={{ __html: purifiedText }}
    />
  );
};
