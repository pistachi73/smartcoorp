import debounce from 'lodash.debounce';
import { MetaData } from 'metadata-scraper';
import { memo, useCallback, useMemo, useState } from 'react';

import Image from 'next/image';

import { Col, Grid, Row } from '../../../grid-layout';
import { Headline } from '../../../headline/headline';
import { useBlocksDBUpdaterContext } from '../../contexts/blocks-db-context';
import {
  MODIFY_FIELD,
  MODIFY_LINK_DATA,
} from '../../contexts/blocks-db-context/blocks-db-reducer/actions';
import { MODIFY_FIELD_INNERHTML } from '../../contexts/blocks-db-context/undo-redo-reducer';
import { useRefsContext } from '../../contexts/refs-context';
import { TextBoxField } from '../../fields/text-box-field';
import { debounceDelay, getCaretPosition } from '../../helpers';
import type { LinkBlockContentProps } from '../blocks.types';

import * as S from './link-block.styles';

export const LinkBlockContent = memo<LinkBlockContentProps>(
  ({ blockIndex, chainBlockIndex, chainId, block, getMetaData }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const dispatchBlocksDB = useBlocksDBUpdaterContext();

    const { fieldRefs, setPrevCaretPosition, prevCaretPosition } =
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
      if (!url?.trim()) return;

      try {
        const urlMetaData: MetaData = await getMetaData(url?.trim());

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

        dispatchBlocksDB({
          type: MODIFY_LINK_DATA,
          payload: {
            blockId: block.id,
            url: urlMetaData.url,
            domain: urlMetaData.url?.split('//')[1].split('/')[0],
            title: urlMetaData.title,
            description: urlMetaData.description,
            imageUrl: urlMetaData.image,
          },
        });
      } catch (_) {
        setError(true);
      }
    };

    const onLinkChange = useCallback(
      (e: React.ChangeEvent) => {
        const currentCaretPosition = getCaretPosition(
          fieldRefs.current[blockIndex][0]
        );

        const undoAction = {
          type: MODIFY_FIELD_INNERHTML,
          payload: {
            fieldId,
            setPrevCaretPosition,
            caretPosition: prevCaretPosition.current,
          },
        } as const;

        const redoAction = {
          type: MODIFY_FIELD_INNERHTML,
          payload: {
            fieldId,
            caretPosition: currentCaretPosition,
            setPrevCaretPosition,
          },
        } as const;

        dispatchBlocksDB({
          type: MODIFY_FIELD,
          payload: {
            blockId: block.id,
            field: 'link',
            value: e.target.innerHTML,
            undoAction,
            redoAction,
          },
        });

        setPrevCaretPosition(currentCaretPosition);
      },
      [
        fieldRefs,
        blockIndex,
        fieldId,
        setPrevCaretPosition,
        prevCaretPosition,
        dispatchBlocksDB,
        block.id,
      ]
    );

    const deboucedOnLinkChange = useMemo(
      () => debounce(onLinkChange, debounceDelay),
      [onLinkChange]
    );

    return !block.data.title ? (
      <S.Container>
        <TextBoxField
          blockId={block.id}
          blockIndex={blockIndex}
          text={block.data.link}
          field="link"
          fieldIndex={fieldIndex}
          placeholder="Write a URL (e.g. https://www.google.com)"
          loading={loading}
          error={error}
          onInputChange={deboucedOnLinkChange}
          onKeyDown={handleInputBoxKeyPress}
          data-block-type="link"
        />
        {loading ? <S.DotLoading disabled /> : null}
      </S.Container>
    ) : (
      <S.MetaDataContainer href={block.data.link} target={'_blank'}>
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
