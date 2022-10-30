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
import { scale160, space4XL, spaceM } from '../../tokens';

import { Headline } from './headline';
import { sizes } from './headline.styles';
import { HeadlineSize } from './headline.types';

export default {
  title: 'Typography/Headline',
  component: Headline,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Headline</Title>
          <Subtitle>Headline typography Smartcookie component</Subtitle>
          <Description>
            The `Headline` component is used for common paragraph copies arround
            SC projects.
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
} as ComponentMeta<typeof Headline>;

const Template: ComponentStory<typeof Headline> = (args) => (
  <Headline {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: 'hello',
  as: 'h2',
};
Default.parameters = {
  ...noCanvas,
};

const PropContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${space4XL};
  padding: ${spaceM} 0;
`;
const TypeContainer = styled.div`
  width: ${scale160};
`;

export const Sizes = () => {
  const sizePx: any = {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
    xxlarge: '24px',
    xxxlarge: '32px',
  };

  const headlineSizes = Object.keys(sizes);

  return (
    <>
      {headlineSizes.map((key) => (
        <PropContainer>
          <TypeContainer>
            <Headline size={key as HeadlineSize} noMargin>
              {sizePx[key]}
            </Headline>
          </TypeContainer>
          <Headline size={key as HeadlineSize} noMargin>
            This is a Smartcookie Headline
          </Headline>
        </PropContainer>
      ))}
    </>
  );
};

Sizes.parameters = {
  ...noCanvas,
  docs: {
    description: {
      story: 'Sizes for `Headline` component',
    },
  },
};
