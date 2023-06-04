import { Meta } from '@storybook/react';
import styled from 'styled-components';

import { noCanvas, setPropDocumentation } from '../../helpers';
import { scale300, space4XL, spaceM } from '../../tokens';

import { Hero } from './hero';
import { fontWeights, sizes } from './hero.styles';
import { HeroFontWeight, HeroSize } from './hero.types';

export default {
  title: 'Typography/Hero',
  component: Hero,
  parameters: {
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
    size: setPropDocumentation({ control: 'inline-radio' }),
    sizeConfined: setPropDocumentation({ control: 'inline-radio' }),
    sizeWide: setPropDocumentation({ control: 'inline-radio' }),
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

const PropContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${space4XL};
  padding: ${spaceM} 0;
`;
const TypeContainer = styled.div`
  width: ${scale300};
`;

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
      <>
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
      </>
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
      <>
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
      </>
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
