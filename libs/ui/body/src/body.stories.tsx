import { Meta } from '@storybook/react';

import { TypographyDocs, noCanvas } from '@smartcoorp/ui/shared';

import { Body } from './body';
import { fontWeights, lineHeights, sizes, variants } from './body.styles';
import {
  BodyCopyFontWeight,
  BodyCopyLineHeight,
  BodyCopySize,
  BodyCopyVariants,
} from './body.types';

const bodySizes: string[] = Object.keys(sizes);
const bodyWeights: string[] = Object.keys(fontWeights);

export default {
  title: 'Typography/Body',
  component: Body,
  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The Body component is used for common paragraph copies arround SC projects.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<typeof Body>;

export const Default = {
  args: {
    children: 'Hello this the Default of the body component',
    size: 'medium',
    fontWeight: 'regular',
  },

  parameters: {
    ...noCanvas,
    controls: { hideNoControlsWarning: true },
  },
};

export const Sizes = {
  render: () => {
    const sizePx: any = {
      xsmall: '12px',
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px',
    };

    return (
      <TypographyDocs.Container>
        {bodySizes.map((key) => (
          <TypographyDocs.PropContainer key={key}>
            <TypographyDocs.TypeContainer>
              <Body size={key as BodyCopySize} noMargin>
                {sizePx[key]}
              </Body>
            </TypographyDocs.TypeContainer>
            <Body size={key as BodyCopySize} noMargin>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body>
          </TypographyDocs.PropContainer>
        ))}
      </TypographyDocs.Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Posible sizes for `Body` component',
      },
    },
  },
};

export const FontWeights = {
  render: () => {
    const sizePx: any = {
      regular: 400,
      bold: 700,
    };
    return (
      <TypographyDocs.Container>
        {bodyWeights.map((key) => (
          <TypographyDocs.PropContainer key={key}>
            <TypographyDocs.TypeContainer>
              <Body noMargin fontWeight={key as BodyCopyFontWeight}>
                {sizePx[key]}
              </Body>
            </TypographyDocs.TypeContainer>
            <Body noMargin fontWeight={key as BodyCopyFontWeight}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body>
          </TypographyDocs.PropContainer>
        ))}
      </TypographyDocs.Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Font weights for `Body` component',
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
              <Body noMargin lineHeight={key as BodyCopyLineHeight}>
                {lineHeightsMapping[key]}
              </Body>
            </TypographyDocs.TypeContainer>
            <Body noMargin lineHeight={key as BodyCopyLineHeight}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              egestas, lorem eu condimentum faucibus, est urna sodales magna,
              consequat elementum ligula lorem efficitur ex. Proin auctor tortor
              non dolor consectetur tincidunt.
            </Body>
          </TypographyDocs.PropContainer>
        ))}
      </TypographyDocs.Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Line heights for `Body` component',
      },
    },
  },
};

export const Variants = {
  render: () => {
    const variantsMapping: any = {
      primary: 'primary',
      neutral: 'neutral',
      success: 'success',
      warning: 'warning',
      error: 'error',
    };

    const variantTypes = Object.keys(variants);

    return (
      <TypographyDocs.Container>
        {variantTypes.map((key) => (
          <TypographyDocs.PropContainer key={key}>
            <TypographyDocs.TypeContainer>
              <Body noMargin lineHeight={key as BodyCopyLineHeight}>
                {variantsMapping[key]}
              </Body>
            </TypographyDocs.TypeContainer>
            <Body noMargin variant={key as BodyCopyVariants}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body>
          </TypographyDocs.PropContainer>
        ))}
      </TypographyDocs.Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Variants for `Body` component',
      },
    },
  },
};
