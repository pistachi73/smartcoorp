import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
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
      page: () => (
        <>
          <Title>Hero</Title>
          <Subtitle>Hero typography Smartcookie component</Subtitle>
          <Description>
            The `Hero` component is used for common paragraph copies arround SC
            projects.
          </Description>
          <Description>
            `Hero` component uses a different `font style` from the rest of the
            typograpography components. It uses `Oswald`
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="Reference" />
        </>
      ),
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
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: 'This is a hero',
  size: 'medium',
  fontWeight: 'regular',
};

Default.parameters = {
  ...noCanvas,
  controls: { hideNoControlsWarning: true },
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

export const Sizes = () => {
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
};

Sizes.parameters = {
  ...noCanvas,
  docs: {
    description: {
      story: 'Posible sizes for `HERO` component',
    },
  },
};

export const FontWeights = () => {
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
};

FontWeights.parameters = {
  ...noCanvas,
  docs: {
    description: {
      story: 'Font weights for `HERO` component',
    },
  },
};
