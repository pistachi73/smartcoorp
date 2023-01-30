import { v4 as uuid } from 'uuid';

import { ParagraphBlockProps } from '../post-editor.types';

export const buildParagraphBlock = (
  chainId: string,
  text = ''
): ParagraphBlockProps => ({
  id: uuid(),
  chainId,
  type: 'paragraph',
  data: {
    text,
  },
});
