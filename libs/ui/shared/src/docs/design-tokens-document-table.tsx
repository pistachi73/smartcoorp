// import { Button } from '@components';
import React from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

import { Body } from '@smartcoorp/ui/body';

import * as S from './design-tokens-document-table.styles';

type Props = {
  preview?: any;
  tokens: any;
  tokenKeys: string[];
};

export const DesignSystemDocumentTable: React.FC<Props> = ({
  preview: Preview,
  tokens,
  tokenKeys,
}) => {
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <S.Table>
      <thead>
        <S.TableRow isHeaderRow>
          <S.NameColumn>
            <S.BodyHeaders size="xsmall">Name</S.BodyHeaders>
          </S.NameColumn>
          <S.ValueColumn>
            <S.BodyHeaders size="xsmall">Value</S.BodyHeaders>
          </S.ValueColumn>

          <S.PreviewColumn>
            <S.BodyHeaders size="xsmall">Preview</S.BodyHeaders>
          </S.PreviewColumn>
        </S.TableRow>
      </thead>
      <tbody>
        {tokenKeys.map((tokenKey) => (
          <S.TableRow key={tokenKey}>
            <S.NameColumn as="td">
              <S.NameCell>
                <Body size="small" noMargin>
                  {tokenKey}
                </Body>
                <button
                  // variant="text"
                  // icon={AiOutlineCopy}
                  onClick={() => copyToClipboard(tokenKey)}
                  // size="small"
                />
              </S.NameCell>
            </S.NameColumn>
            <S.ValueColumn as="td">
              <S.ValueCell>
                <S.ValueBody size="small">{tokens[tokenKey]}</S.ValueBody>
              </S.ValueCell>
            </S.ValueColumn>
            <S.PreviewColumn as="td">
              <Preview tokenValue={tokens[tokenKey]}></Preview>
            </S.PreviewColumn>
          </S.TableRow>
        ))}
      </tbody>
    </S.Table>
  );
};
