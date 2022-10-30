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
import { scale080, scale360, space4XL, spaceM } from '../../tokens';

import { Caption } from './caption';
import { fontWeights, lineHeights } from './caption.styles';
import { CaptionFontWeight, CaptionLineHeight } from './caption.types';

export default {
  title: 'Typography/Caption',
  component: Caption,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Caption</Title>
          <Subtitle>Caption typography Smartcookie component</Subtitle>
          <Description>
            The `Caption` component is used for common paragraph copies arround
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
  },
} as ComponentMeta<typeof Caption>;

const Template: ComponentStory<typeof Caption> = (args) => (
  <Caption {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'This is a caption text',
  fontWeight: 'regular',
};

const PropContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${space4XL};
  padding: ${spaceM} 0;
`;
const TypeContainer = styled.div`
  width: ${scale080};
`;

export const FontWeights = () => {
  const sizePx: any = {
    regular: 400,
    bold: 700,
  };

  const captionFontWeights = Object.keys(fontWeights);

  return (
    <>
      {captionFontWeights.map((key) => (
        <PropContainer key={key}>
          <TypeContainer>
            <Caption noMargin fontWeight={key as CaptionFontWeight}>
              {sizePx[key]}
            </Caption>
          </TypeContainer>
          <Caption noMargin fontWeight={key as CaptionFontWeight}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Caption>
        </PropContainer>
      ))}
    </>
  );
};

FontWeights.parameters = {
  ...noCanvas,
  docs: {
    description: {
      story: 'Font weights for `Caption` component',
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

  const CaptionContainer = styled.div`
    width: ${scale360};
  `;

  return (
    <>
      {lineHeightsTypes.map((key) => (
        <PropContainer key={key}>
          <TypeContainer>
            <Caption noMargin lineHeight={key as CaptionLineHeight}>
              {lineHeightsMapping[key]}
            </Caption>
          </TypeContainer>
          <CaptionContainer>
            <Caption noMargin lineHeight={key as CaptionLineHeight}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              egestas, lorem eu condimentum faucibus, est urna sodales magna,
              consequat elementum ligula lorem efficitur ex. Proin auctor tortor
              non dolor consectetur tincidunt.
            </Caption>
          </CaptionContainer>
        </PropContainer>
      ))}
    </>
  );
};

LineHeights.parameters = {
  ...noCanvas,
  docs: {
    description: {
      story: 'Line heights for `Caption` component',
    },
  },
};
