import { Primary, Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import React from 'react';
import styled, { css } from 'styled-components';

import { noCanvas } from '../../helpers';
import { DesignSystemDocumentTable } from '../../shared';
import { borderRadiusXS, primary } from '../../tokens';
import * as scaleTokens from '../scale';

export default {
  title: 'Tokens/Scale',

  parameters: {
    maxWidth: true,
    docs: {
      descrioption: {
        component: 'Design tokens: media scale',
      },
    },
  },
} as Meta<typeof DesignSystemDocumentTable>;

type PreviewProps = {
  width: string;
};
const Preview = styled.div<PreviewProps>`
  ${({ width }) => {
    return css`
      width: ${width};
    `;
  }}
  height: 25px;
  border-radius: ${borderRadiusXS};
  background-color: ${primary};
`;

const ScalePreview = ({ tokenValue }: { tokenValue: string }) => {
  const width: number = (parseFloat(tokenValue.split('px')[0]) / 432) * 100;
  return <Preview width={`${width}%`} />;
};

export const Scale = {
  render: () => {
    const tokenKeys: string[] = Object.getOwnPropertyNames(scaleTokens);
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
        tokens={scaleTokens}
        tokenKeys={tokenKeys}
        preview={ScalePreview}
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
