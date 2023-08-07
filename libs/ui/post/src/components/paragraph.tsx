import DOMPurify from 'dompurify';
import { ParagraphBlockProps } from 'libs/ui/post-editor/src/post-editor.types';
import { styled } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { gray800 } from '@smartcoorp/ui/tokens';

const StyledBody = styled(Body)`
  color: ${gray800};
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
