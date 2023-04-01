import { Primary, Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import styled from 'styled-components';

import { Body } from '../../components';
import { noCanvas } from '../../helpers';
import { DesignSystemDocumentTable } from '../../shared';
import { gray900, spaceS } from '../../tokens';
import * as mediaQuerysTokens from '../media';

export default {
  title: 'Tokens/Media Querys',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Media query token</Title>
          <Subtitle>Design tokens: media query</Subtitle>
          <Primary />
        </>
      ),
    },
  },
} as Meta<typeof DesignSystemDocumentTable>;

type Interval = { min: string; max: string };

const PreviewContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${spaceS};
  margin-bottom: 10px;
`;

const Limit = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LimitBody = styled(Body)`
  position: absolute;
  top: 100%;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${gray900};
`;

const MediaQuerysPreview = ({ tokenValue }: { tokenValue: string }) => {
  const interval: Interval = { max: '♾️', min: '0px' };

  tokenValue.split('and').map((val) => {
    const value: string = val.split(':')[1].trim().replace(')', '');
    if (val.includes('min')) interval.min = value;
    else interval.max = value;
  });

  return (
    <PreviewContainer>
      <Limit>
        <Body size="small" noMargin>
          [
        </Body>
        <LimitBody size="xsmall" noMargin>
          {interval.min}
        </LimitBody>
      </Limit>
      <Line></Line>
      <Limit>
        <Body size="small" noMargin>
          ]
        </Body>
        <LimitBody size="xsmall" noMargin>
          {interval.max}
        </LimitBody>
      </Limit>
    </PreviewContainer>
  );
};

export const MediaQuerys = {
  render: () => {
    const tokenKeys: string[] = Object.getOwnPropertyNames(mediaQuerysTokens);
    const shift = tokenKeys.shift();

    const order = [
      'mediaTiny',
      'mediaSmall',
      'mediaConfined',
      'mediaWide',
      'mediaXWide',
      'mediaSmallOrTiny',
      'mediaSmallOnly',
      'mediaConfinedOnly',
      'mediaWideOnly',
    ];
    tokenKeys.sort((a, b) => order.indexOf(a) - order.indexOf(b));

    return (
      <DesignSystemDocumentTable
        tokens={mediaQuerysTokens}
        preview={MediaQuerysPreview}
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
