import { Meta } from '@storybook/react';

import { noCanvas, setPropDocumentation } from '../../helpers';
import {
  Container,
  PropContainer,
  TypeContainer,
} from '../../helpers/typography-docs.styles';

import { Hero } from './hero';
import { fontWeights, sizes } from './hero.styles';
import { HeroFontWeight, HeroSize } from './hero.types';

export default {
  title: 'Typography/Hero',
  component: Hero,
  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The Hero component is used for common paragraph copies arround SC projects.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    children: setPropDocumentation({ control: 'text' }),
  },
} as Meta<typeof Hero>;

export const Default = {
  args: {
    children: 'This is a hero',
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
      small: '32px',
      medium: '48px',
      large: '60px',
      xlarge: '92px',
    };

    const heroSizes = Object.keys(sizes);

    return (
      <Container>
        {heroSizes.map((key) => (
          <PropContainer key={key}>
            <TypeContainer>
              <Hero size={key as HeroSize} noMargin>
                {sizePx[key]}
              </Hero>
            </TypeContainer>
            <Hero size={key as HeroSize} noMargin>
              THIS IS A HERO
            </Hero>
          </PropContainer>
        ))}
      </Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Posible sizes for `HERO` component',
      },
    },
  },
};

export const FontWeights = {
  render: () => {
    const sizePx: any = {
      regular: 400,
      bold: 600,
    };

    const heroFontWeights = Object.keys(fontWeights);

    return (
      <Container>
        {heroFontWeights.map((key) => (
          <PropContainer key={key}>
            <TypeContainer>
              <Hero noMargin fontWeight={key as HeroFontWeight}>
                {sizePx[key]}
              </Hero>
            </TypeContainer>
            <Hero noMargin fontWeight={key as HeroFontWeight}>
              HERO FONTWEIGHTS
            </Hero>
          </PropContainer>
        ))}
      </Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Font weights for `HERO` component',
      },
    },
  },
};
