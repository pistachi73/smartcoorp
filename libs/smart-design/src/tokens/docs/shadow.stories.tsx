import { Title, Subtitle, Primary } from '@storybook/addon-docs';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import styled, { css } from 'styled-components';

import { noCanvas } from '../../helpers';
import { DesignSystemDocumentTable } from '../../shared';
import { borderRadiusS, gray900, borderRadiusM } from '../../tokens';
import * as shadowTokens from '../shadow';

export default {
  title: 'Tokens/Shadow',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Shadow token</Title>
          <Subtitle>Design tokens: shadow</Subtitle>
          <Primary />
        </>
      ),
    },
  },
} as ComponentMeta<typeof DesignSystemDocumentTable>;

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
  console.log(tokenValue);
  const isDark = tokenValue.includes('255');

  console.log(isDark);
  return (
    <PreviewContainer $dark={isDark}>
      <Preview shadow={tokenValue} />
    </PreviewContainer>
  );
};

export const Shadow = () => {
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
};

Shadow.parameters = {
  ...noCanvas,
  docs: {
    source: {
      code: '',
    },
  },
};
