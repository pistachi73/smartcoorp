import debounce from 'lodash.debounce';
import { memo, useCallback, useMemo, useState } from 'react';

import Image from 'next/image';

import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { Headline } from '@smartcoorp/ui/headline';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
import { useRefsContext } from '../../contexts/refs-context';
import { TextBoxField } from '../../fields/text-box-field';
import { debounceDelay, getCaretPosition } from '../../helpers';
import type { LinkBlockContentProps } from '../blocks.types';

import * as S from './link-block.styles';

export const LinkBlockContent = memo<LinkBlockContentProps>(
  ({ blockIndex, block, getMetaData }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { setFieldValue, setLinkData, buildModifyFieldInnerHTMLAction } =
      useBlocksDBUpdaterContext();

    const { fieldRefs, setPrevCaretPosition, prevCaretPosition, addFieldRef } =
      useRefsContext();

    const fieldIndex = 0;
    const fieldId = `${block.id}_${fieldIndex}`;
    const handleInputBoxKeyPress = async (e: React.KeyboardEvent) => {
      if (e.key !== 'Enter' || loading) return;

      e.preventDefault();

      setError(false);
      setLoading(true);
      await getUrlMetadata();
      setLoading(false);
    };

    const getUrlMetadata = async () => {
      const url: string | null = fieldRefs.current[blockIndex][0].textContent;
      if (!url?.trim() || !getMetaData) return;

      try {
        const urlMetaData = await getMetaData(url?.trim());

        if (
          !urlMetaData ||
          !urlMetaData.title ||
          !urlMetaData.description ||
          !urlMetaData.image ||
          !urlMetaData.url
        ) {
          setError(true);
          return;
        }

        setLinkData({
          blockId: block.id,
          url: urlMetaData.url,
          domain: urlMetaData.url?.split('//')[1].split('/')[0],
          title: urlMetaData.title,
          description: urlMetaData.description,
          imageUrl: urlMetaData.image,
        });
      } catch (_) {
        setError(true);
      }
    };

    const onLinkChange = useCallback(
      (e: any) => {
        const currentCaretPosition = getCaretPosition(
          fieldRefs.current[blockIndex][0]
        );

        setFieldValue({
          blockType: 'link',
          blockId: block.id,
          field: 'link',
          value: e.target.innerHTML,
          undo: buildModifyFieldInnerHTMLAction({
            fieldId,
            caretPosition: prevCaretPosition.current,
          }),
          redo: buildModifyFieldInnerHTMLAction({
            fieldId,
            caretPosition: currentCaretPosition,
          }),
        });

        setPrevCaretPosition(currentCaretPosition);
      },
      [
        fieldRefs,
        blockIndex,
        setFieldValue,
        block.id,
        buildModifyFieldInnerHTMLAction,
        fieldId,
        prevCaretPosition,
        setPrevCaretPosition,
      ]
    );

    const deboucedOnLinkChange = useMemo(
      () => debounce(onLinkChange, debounceDelay),
      [onLinkChange]
    );

    return !block.data.title ? (
      <S.Container>
        <TextBoxField
          size="small"
          blockId={block.id}
          blockIndex={blockIndex}
          text={block.data.link}
          fieldIndex={fieldIndex}
          placeholder="Write a URL (e.g. https://www.google.com)"
          loading={loading}
          error={error}
          onInput={deboucedOnLinkChange}
          onKeyDown={handleInputBoxKeyPress}
          data-block-type="link"
        />
        {loading ? <S.DotLoading disabled /> : null}
      </S.Container>
    ) : (
      <S.MetaDataContainer
        href={block.data.link}
        target={'_blank'}
        ref={addFieldRef(blockIndex, fieldIndex)}
      >
        <Grid>
          <Row noMargin>
            <Col size={8}>
              <Headline size="xlarge">{block.data.title}</Headline>
              <S.MetaDescription>{block.data.description}</S.MetaDescription>
              <S.MetaDomain size={'xsmall'} noMargin>
                {block.data.domain}
              </S.MetaDomain>
            </Col>
            <Col offset={1} size={3}>
              {block.data.imageUrl && (
                <S.MetaImageContainer>
                  <Image
                    src={`/api/imagefetcher?url=${encodeURIComponent(
                      block.data.imageUrl
                    )}`}
                    alt={`${block.data.domain} metadata image`}
                    style={{ objectFit: 'contain' }}
                    fill
                  />
                </S.MetaImageContainer>
              )}
            </Col>
          </Row>
        </Grid>
      </S.MetaDataContainer>
    );
  }
);
