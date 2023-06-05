import { Primary, Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import React from 'react';
import styled, { css } from 'styled-components';

import { noCanvas } from '../../helpers';
import { DesignSystemDocumentTable } from '../../shared';
import { borderRadiusM, borderRadiusS, gray900 } from '../../tokens';
import * as shadowTokens from '../shadow';

export default {
  title: 'Tokens/Shadow',
  parameters: {
    maxWidth: true,
    docs: {
      descrioption: {
        component: 'Design tokens: media shadow',
      },
    },
  },
} as Meta<typeof DesignSystemDocumentTable>;

type PreviewProps = {
  shadow: string;
};
const Preview = styled.div<PreviewProps>`
  width: 50%;
  height: 50%;
  border-radius: ${borderRadiusS};

  ${({ shadow }) =>
    css`
      box-shadow: ${shadow};
    `}
`;

const PreviewContainer = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  border-radius: ${borderRadiusM};
  background-color: ${({ $dark }) => ($dark ? gray900 : 'white')};
`;

const ShadowPreview = ({ tokenValue }: { tokenValue: string }) => {
  const isDark = tokenValue.includes('255');

  return (
    <PreviewContainer $dark={isDark}>
      <Preview shadow={tokenValue} />
    </PreviewContainer>
  );
};

export const Shadow = {
  render: () => {
    const tokenKeys: string[] = Object.getOwnPropertyNames(shadowTokens);
    const shift = tokenKeys.shift();

    const order = [
      'dropShadowS',
      'dropShadowM',
      'dropShadowL',
      'dropShadowXL',
      'dropShadowDarkS',
      'dropShadowDarkM',
      'dropShadowDarkL',
      'dropShadowDarkXL',
    ];
    tokenKeys.sort((a, b) => order.indexOf(a) - order.indexOf(b));

    return (
      <DesignSystemDocumentTable
        tokens={shadowTokens}
        preview={ShadowPreview}
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
