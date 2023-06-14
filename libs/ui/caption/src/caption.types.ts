import { Styled, fontWeights, lineHeights } from './caption.styles';

export type CaptionLineHeight = keyof typeof lineHeights;
export type CaptionFontWeight = keyof typeof fontWeights;
export type CaptionProps = React.ComponentProps<typeof Styled.Caption> & {
  /** Content of the caption */
  children: React.ReactNode;
  /** Activate text truncation */
  ellipsis?: boolean;
  /** Set font-weight */
  fontWeight?: CaptionFontWeight;
  /** Decrease or increase line-height */
  lineHeight?: CaptionLineHeight;
  /** Remove margin-bottom */
  noMargin?: boolean;
};
