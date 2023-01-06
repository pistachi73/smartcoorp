import debounce from 'lodash.debounce';
import { MetaData } from 'metadata-scraper';
import { memo, useCallback, useMemo, useState } from 'react';

import Image from 'next/image';

import { Col, Grid, Row } from '../../../grid-layout';
import { Headline } from '../../../headline/headline';
import { useBlockUpdaterContext } from '../../contexts/block-context';
import { TextBoxField } from '../../fields/text-box-field';
import { debounceDelay } from '../../helpers';
import { updateBlocks } from '../../helpers/fp-helpers';
import { usePreviousPersistentWithMatcher, useRefs } from '../../hooks';
import { useDispatchAsyncCommand } from '../../hooks/use-commands/use-dispatch-async-commands';
import { LinkBlockProps } from '../../post-editor.types';

import * as S from './link-block.styles';

type LinkBlockContentProps = {
  blockIndex: number;
  block: LinkBlockProps;
  getMetaData: any;
};

export const LinkBlockContent = memo<LinkBlockContentProps>(
  ({ blockIndex, block, getMetaData }) => {
    const { focusableRefs } = useRefs();
    const { setBlocks, updateBlockFields } = useBlockUpdaterContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const focusIndex = 0;

    const handleInputBoxKeyPress = async (e: React.KeyboardEvent) => {
      if (e.key !== 'Enter' || loading) return;

      e.preventDefault();

      setError(false);
      setLoading(true);
      await getUrlMetadata();
      setLoading(false);
    };

    const getUrlMetadata = async () => {
      const url: string | null = focusableRefs.current[blockIndex][0].textContent;
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

        setBlocks(
          updateBlocks({
            [blockIndex]: {
              data: {
                url: { $set: urlMetaData.url },
                domain: { $set: urlMetaData.url?.split('//')[1].split('/')[0] },
                title: { $set: urlMetaData.title },
                description: { $set: urlMetaData.description },
                imageUrl: { $set: urlMetaData.image },
              },
            },
          })
        );
      } catch (_) {
        setError(true);
      }
    };

    const prevLink = usePreviousPersistentWithMatcher(block.data.link);
    const { dispatchAsyncCommand } = useDispatchAsyncCommand(block.data.link, prevLink || '');

    const onLinkChange = useCallback(
      (e: React.ChangeEvent) => {
        updateBlockFields(blockIndex, { link: e.target.innerHTML });
        dispatchAsyncCommand({
          type: 'editTextField',
          field: 'link',
          fieldId: `${block.id}_${focusIndex}`,
          blockIndex,
          ref: focusableRefs.current[blockIndex][0],
        });
      },
      [updateBlockFields, blockIndex, dispatchAsyncCommand, block.id, focusableRefs]
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
          focusIndex={focusIndex}
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
                    src={`/api/imagefetcher?url=${encodeURIComponent(block.data.imageUrl)}`}
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
