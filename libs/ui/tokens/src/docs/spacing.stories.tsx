import { Meta } from '@storybook/react';
import styled, { css } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { DesignSystemDocumentTable, noCanvas } from '@smartcoorp/ui/shared';
import { gray900 } from '@smartcoorp/ui/tokens';

import * as spacingTokens from '../spacing';

export default {
  title: 'Tokens/Spacing',
  parameters: {
    maxWidth: true,
    docs: {
      descrioption: {
        component: 'Design tokens: spacing',
      },
    },
  },
} as Meta<typeof DesignSystemDocumentTable>;

const Preview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Line = styled.div<{ width: string }>`
  ${({ width }) => css`
    width: ${width};
  `}
  height: 1px;
  background: ${gray900};
`;

const SpacingPreview = ({ tokenValue }: { tokenValue: string }) => {
  const width: number = (parseFloat(tokenValue.split('px')[0]) / 122) * 100;
  return (
    <Preview>
      <Body size="small" noMargin>
        [
      </Body>
      <Line width={`${width}%`}> </Line>
      <Body size="small" noMargin>
        ]
      </Body>
    </Preview>
  );
};

export const Spacing = {
  render: () => {
    const tokenKeys: string[] = Object.getOwnPropertyNames(spacingTokens);
    const shift = tokenKeys.shift();

    const order = [
      'spaceXXS',
      'spaceXS',
      'spaceS',
      'spaceM',
      'spaceL',
      'spaceXL',
      'spaceXXL',
      'space3XL',
      'space4XL',
      'space5XL',
      'space6XL',
    ];
    tokenKeys.sort((a, b) => order.indexOf(a) - order.indexOf(b));

    return (
      <DesignSystemDocumentTable
        tokens={spacingTokens}
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
