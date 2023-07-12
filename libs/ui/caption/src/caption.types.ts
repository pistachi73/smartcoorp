import { fontWeights, lineHeights } from './caption.styles';

export type CaptionLineHeight = keyof typeof lineHeights;
export type CaptionFontWeight = keyof typeof fontWeights;
export type CommonProps = {
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

export type CaptionProps = CommonProps &
  React.ComponentPropsWithoutRef<'p'> & {
    as?: string | React.ComponentType<any> | undefined;
    forwardedAs?: string | React.ComponentType<any> | undefined;
  };
