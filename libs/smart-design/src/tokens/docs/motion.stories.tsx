import { Title, Subtitle, Primary } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import React from 'react';

// import { Caption } from '../../components';
import { noCanvas } from '../../helpers';
import { DesignSystemDocumentTable } from '../../shared';
import * as motionTokens from '../motion';

export default {
  title: 'Tokens/Motion',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Motion token</Title>
          <Subtitle>Design tokens: motion</Subtitle>
          <Primary />
        </>
      ),
    },
  },
} as Meta<typeof DesignSystemDocumentTable>;

const SpacingPreview = () => {
  // return <Caption noMargin>no preview</Caption>;
  return <p>no preview</p>;
};

export const Motion = {
  render: () => {
    const tokenKeys: string[] = Object.getOwnPropertyNames(motionTokens);
    const shift = tokenKeys.shift();
    const order = [
      'motionEasingEnter',
      'motionEasingLeave',
      'motionEasingStandard',
      'motionTimeXXS',
      'motionTimeXS',
      'motionTimeS',
      'motionTimeM',
      'motionTimeL',
      'motionTimeXL',
      'motionTimeXXL',
      'motionTimeNumberXXS',
      'motionTimeNumberXS',
      'motionTimeNumberS',
      'motionTimeNumberM',
      'motionTimeNumberL',
      'motionTimeNumberXL',
      'motionTimeNumberXXL',
    ];
    tokenKeys.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    return (
      <DesignSystemDocumentTable
        tokens={motionTokens}
        preview={SpacingPreview}
        tokenKeys={tokenKeys}
      />
    );
  },

  parameters: {
    ...noCanvas,
    docs: {
      source: {
        code: '',
      },
    },
  },
};
