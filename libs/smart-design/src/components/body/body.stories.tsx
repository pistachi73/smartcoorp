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

import { noCanvas } from '../../helpers';
import { scale160, space4XL, spaceM } from '../../tokens';

import { Body } from './body';
import { fontWeights, lineHeights, sizes } from './body.styles';
import {
  BodyCopyFontWeight,
  BodyCopyLineHeight,
  BodyCopySize,
} from './body.types';

const bodySizes: string[] = Object.keys(sizes);
const bodyWeights: string[] = Object.keys(fontWeights);

export default {
  title: 'Typography/Body',
  component: Body,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Body</Title>
          <Subtitle>Paragraph typography Smartcookie component</Subtitle>
          <Description>
            The `Body` component is used for common paragraph copies arround SC
            projects.
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
        </>
      ),
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as ComponentMeta<typeof Body>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Body> = (args) => <Body {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: 'Hello this the Default of the body component',
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
  width: ${scale160};
`;

export const Sizes = () => {
  const sizePx: any = {
    xsmall: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
  };

  return (
    <>
      {bodySizes.map((key) => (
        <PropContainer key={key}>
          <TypeContainer>
            <Body size={key as BodyCopySize} noMargin>
              {sizePx[key]}
            </Body>
          </TypeContainer>
          <Body size={key as BodyCopySize} noMargin>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Body>
        </PropContainer>
      ))}
    </>
  );
};

Sizes.parameters = {
  ...noCanvas,
  docs: {
    description: {
      story: 'Posible sizes for `Body` component',
    },
  },
};

export const FontWeights = () => {
  const sizePx: any = {
    regular: 400,
    bold: 700,
  };
  return (
    <>
      {bodyWeights.map((key) => (
        <PropContainer key={key}>
          <TypeContainer>
            <Body noMargin fontWeight={key as BodyCopyFontWeight}>
              {sizePx[key]}
            </Body>
          </TypeContainer>
          <Body noMargin fontWeight={key as BodyCopyFontWeight}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Body>
        </PropContainer>
      ))}
    </>
  );
};

FontWeights.parameters = {
  ...noCanvas,
  docs: {
    description: {
      story: 'Font weights for `Body` component',
    },
  },
};

export const LineHeights = () => {
  const lineHeightsMapping: any = {
    dense: 'dense',
    default: 'default',
    increased: 'increased',
  };

  const lineHeightsTypes = Object.keys(lineHeights);
  lineHeightsTypes[2] = lineHeightsTypes[1];
  lineHeightsTypes[1] = 'default';

  return (
    <>
      {lineHeightsTypes.map((key) => (
        <PropContainer key={key}>
          <TypeContainer>
            <Body noMargin lineHeight={key as BodyCopyLineHeight}>
              {lineHeightsMapping[key]}
            </Body>
          </TypeContainer>
          <Body noMargin lineHeight={key as BodyCopyLineHeight}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            egestas, lorem eu condimentum faucibus, est urna sodales magna,
            consequat elementum ligula lorem efficitur ex. Proin auctor tortor
            non dolor consectetur tincidunt.
          </Body>
        </PropContainer>
      ))}
    </>
  );
};

LineHeights.parameters = {
  ...noCanvas,
  docs: {
    description: {
      story: 'Line heights for `Body` component',
    },
  },
};
