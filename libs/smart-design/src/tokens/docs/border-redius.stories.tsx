// import { noCanvas } from '@helpers';
import { Title, Subtitle, Primary } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import React from 'react';
import styled, { css } from 'styled-components';

import { DesignSystemDocumentTable } from '../../shared';
import * as borderRadiusTokens from '../borderRadius';
import { primary } from '../color';

export default {
  title: 'Tokens/Border Radius',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Border radius token</Title>
          <Subtitle>Design tokens: border radius</Subtitle>
          <Primary />
        </>
      ),
    },
  },
} as Meta<typeof DesignSystemDocumentTable>;

type PreviewProps = {
  borderRadius: string;
};
const Preview = styled.div<PreviewProps>`
  width: 100%;
  background-color: ${primary};

  ${({ borderRadius }) =>
    css`
      height: calc(35px + ${borderRadius} / 1.5);
      border-radius: ${borderRadius};
    `}
`;

const SpacingPreview = ({ tokenValue }: { tokenValue: string }) => {
  return <Preview borderRadius={tokenValue} />;
};

export const BorderRadius = {
  render: () => {
    const tokenKeys: string[] = Object.getOwnPropertyNames(borderRadiusTokens);
    const shift = tokenKeys.shift();

    const order = [
      'borderRadiusXXS',
      'borderRadiusXS',
      'borderRadiusS',
      'borderRadiusM',
      'borderRadiusL',
      'borderRadiusXL',
    ];

    tokenKeys.sort((a, b) => order.indexOf(a) - order.indexOf(b));

    return (
      <DesignSystemDocumentTable
        tokens={borderRadiusTokens}
        preview={SpacingPreview}
        tokenKeys={tokenKeys}
      />
    );
  },

  parameters: {
    // ...noCanvas,
    docs: {
      source: {
        code: '',
      },
    },
  },
};
