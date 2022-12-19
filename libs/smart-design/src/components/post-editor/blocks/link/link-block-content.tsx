import { MetaData } from 'metadata-scraper';
import { memo, useState } from 'react';

import Image from 'next/image';

import { Col, Grid, Row } from '../../../grid-layout';
import { Headline } from '../../../headline/headline';
import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../hooks';
import { LinkBlockProps } from '../../post-editor.types';

import * as S from './link-block.styles';

type LinkBlockContentProps = {
  blockIndex: number;
  block: LinkBlockProps;
  getMetaData: any;
};

export const LinkBlockContent = memo<LinkBlockContentProps>(
  ({ blockIndex, block, getMetaData }) => {
    const { refs } = useRefs();
    const { setBlocks } = useUpdateBlocks();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleInputBoxKeyPress = async (e: React.KeyboardEvent) => {
      if (e.key !== 'Enter' || loading) return;

      e.preventDefault();

      setError(false);
      setLoading(true);
      await getUrlMetadata();
      setLoading(false);
    };

    const getUrlMetadata = async () => {
      const url: string | null = refs.current[blockIndex].textContent;
      if (!url?.trim()) return;

      try {
        const urlMetaData: MetaData = await getMetaData(url?.trim());

        if (
          !urlMetaData.title ||
          !urlMetaData.description ||
          !urlMetaData.image ||
          !urlMetaData.url
        ) {
          setError(true);
          return;
        }

        setBlocks((prevBlocks) => {
          const newBlocks = [...prevBlocks];
          (newBlocks[blockIndex] as LinkBlockProps).data.meta = {
            url: urlMetaData.url as string,
            domain: urlMetaData.url?.split('//')[1].split('/')[0] as string,
            title: urlMetaData.title as string,
            description: urlMetaData.description as string,
            image: {
              url: urlMetaData.image as string,
            },
          };
          (newBlocks[blockIndex] as LinkBlockProps).data.link = url;

          return newBlocks;
        });
      } catch (_) {
        setError(true);
      }
    };

    return !block.data.meta ? (
      <S.Container>
        <S.StyledInputBox
          id={block.id}
          ref={(el: any) => (refs.current[blockIndex] = el)}
          contentEditable
          data-placeholder="🔗 Link"
          disabled
          onKeyDown={handleInputBoxKeyPress}
          $loading={loading}
          $error={error}
        />
        {loading ? <S.DotLoading disabled /> : null}
      </S.Container>
    ) : (
      <>
        <button
          onClick={() => {
            console.log(refs.current[blockIndex]);
            refs.current[blockIndex].focus({ focusVisible: true });
          }}
        >
          focus
        </button>
        <S.MetaDataContainer
          ref={(el: unknown) => (refs.current[blockIndex] = el)}
          className="skip-tab"
          href={block.data.link}
          target={'_blank'}
        >
          <Grid>
            <Row noMargin>
              <Col size={8}>
                <Headline size="xlarge">{block.data.meta.title}</Headline>
                <S.MetaDescription>
                  {block.data.meta.description}
                </S.MetaDescription>
                <S.MetaDomain size={'xsmall'} noMargin>
                  {block.data.meta.domain}
                </S.MetaDomain>
              </Col>
              <Col offset={1} size={3}>
                {block.data.meta.image?.url && (
                  <S.MetaImageContainer>
                    <Image
                      src={`/api/imagefetcher?url=${encodeURIComponent(
                        block.data.meta.image.url
                      )}`}
                      alt={`${block.data.meta.domain} metadata image`}
                      style={{ objectFit: 'contain' }}
                      fill
                    />
                  </S.MetaImageContainer>
                )}
              </Col>
            </Row>
          </Grid>
        </S.MetaDataContainer>
      </>
    );
  }
);
