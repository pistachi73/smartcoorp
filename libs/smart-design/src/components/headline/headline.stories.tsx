import { Meta } from '@storybook/react';

import { noCanvas, setPropDocumentation } from '../../helpers';
import {
  Container,
  PropContainer,
  TypeContainer,
} from '../../helpers/typography-docs.styles';

import { Headline } from './headline';
import { sizes } from './headline.styles';
import { HeadlineProps, HeadlineSize } from './headline.types';

export default {
  title: 'Typography/Headline',
  component: Headline,
  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The Headline component is used for common paragraph copies arround SC projects.',
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
} as Meta<HeadlineProps>;

export const Default = {
  args: {
    children: 'Headline',
    as: 'h2',
  },

  parameters: {
    ...noCanvas,
  },
};

export const Sizes = {
  render: () => {
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
      <Container>
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
      </Container>
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Sizes for `Headline` component',
      },
    },
  },
};
