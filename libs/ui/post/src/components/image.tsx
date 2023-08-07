import { ImageBlockProps } from 'libs/ui/post-editor/src/post-editor.types';
import { styled } from 'styled-components';

import { Caption } from '@smartcoorp/ui/caption';
import { borderRadiusS, space3XL, spaceXS } from '@smartcoorp/ui/tokens';

const ImageContainer = styled.div`
  width: 100%;
  max-height: 500px;
  margin: ${space3XL} auto;

  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
`;

const ImageComp = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  border-radius: ${borderRadiusS};
  border: 1px solid ${({ theme }) => theme.color.neutral};
  margin-bottom: ${spaceXS};
`;

export const Image = ({ data: { url, caption } }: ImageBlockProps) => {
  if (!url) return null;

  return (
    <ImageContainer>
      <ImageComp src={url} alt={caption ?? 'Blog post image without caption'} />
      {caption && <Caption>{caption}</Caption>}
    </ImageContainer>
  );
};
