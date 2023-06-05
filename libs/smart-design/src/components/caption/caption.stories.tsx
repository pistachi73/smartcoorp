import { Meta } from '@storybook/react';

import { noCanvas, setPropDocumentation } from '../../helpers';
import {
  Container,
  PropContainer,
  TypeContainer,
} from '../../helpers/typography-docs.styles';

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
    children: setPropDocumentation({ control: 'text' }),
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
      <Container>
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
      </Container>
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
      <Container>
        {lineHeightsTypes.map((key) => (
          <PropContainer key={key}>
            <TypeContainer>
              <Caption noMargin lineHeight={key as CaptionLineHeight}>
                {lineHeightsMapping[key]}
              </Caption>
            </TypeContainer>
            <Caption noMargin lineHeight={key as CaptionLineHeight}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              egestas, lorem eu condimentum faucibus, est urna sodales magna,
              consequat elementum ligula lorem efficitur ex. Proin auctor tortor
              non dolor consectetur tincidunt.
            </Caption>
          </PropContainer>
        ))}
      </Container>
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
