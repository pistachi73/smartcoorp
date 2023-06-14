import { Meta } from '@storybook/react';

import { TypographyDocs, noCanvas } from '@smartcoorp/ui/shared';

import { Caption } from './caption';
import { fontWeights, lineHeights } from './caption.styles';
import { CaptionFontWeight, CaptionLineHeight } from './caption.types';

export default {
  title: 'Typography/Caption',
  component: Caption,
  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The Caption component is used for common paragraph copies arround SC projects.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<typeof Caption>;

export const Default = {
  args: {
    children: 'This is a caption text',
    fontWeight: 'regular',
  },
};

export const FontWeights = {
  render: () => {
    const sizePx: any = {
      regular: 400,
      bold: 700,
    };

    const captionFontWeights = Object.keys(fontWeights);

    return (
      <TypographyDocs.Container>
        {captionFontWeights.map((key) => (
          <TypographyDocs.PropContainer key={key}>
            <TypographyDocs.TypeContainer>
              <Caption noMargin fontWeight={key as CaptionFontWeight}>
                {sizePx[key]}
              </Caption>
            </TypographyDocs.TypeContainer>
            <Caption noMargin fontWeight={key as CaptionFontWeight}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Caption>
          </TypographyDocs.PropContainer>
        ))}
      </TypographyDocs.Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Font weights for `Caption` component',
      },
    },
  },
};

export const LineHeights = {
  render: () => {
    const lineHeightsMapping: any = {
      dense: 'dense',
      default: 'default',
      increased: 'increased',
    };

    const lineHeightsTypes = Object.keys(lineHeights);
    lineHeightsTypes[2] = lineHeightsTypes[1];
    lineHeightsTypes[1] = 'default';

    return (
      <TypographyDocs.Container>
        {lineHeightsTypes.map((key) => (
          <TypographyDocs.PropContainer key={key}>
            <TypographyDocs.TypeContainer>
              <Caption noMargin lineHeight={key as CaptionLineHeight}>
                {lineHeightsMapping[key]}
              </Caption>
            </TypographyDocs.TypeContainer>
            <Caption noMargin lineHeight={key as CaptionLineHeight}>
              Lorem ipsum dolor sit amet, c¡onsectetur adipiscing elit. Duis
              egestas, lorem eu condimentum faucibus, est urna sodales magna,
              consequat elementum ligula lorem efficitur ex. Proin auctor tortor
              non dolor consectetur tincidunt.
            </Caption>
          </TypographyDocs.PropContainer>
        ))}
      </TypographyDocs.Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Line heights for `Caption` component',
      },
    },
  },
};
