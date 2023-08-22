import { ImageBlockProps } from 'libs/ui/post-editor/src/post-editor.types';
import { styled } from 'styled-components';

import { Caption } from '@smartcoorp/ui/caption';
import {
  borderRadiusS,
  borderRadiusXS,
  mediaConfined,
  scale110,
  scale120,
  space3XL,
  spaceXL,
  spaceXS,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

const ImageContainer = styled.div`
  padding-top: ${spaceXL};
  overflow: hidden;

  @media ${mediaConfined} {
    padding-top: ${scale120};
    &:first-child {
      padding-top: 0;
    }
  }
`;

const StyledImage = styled.img`
  max-width: 100%;
  min-height: 100%;
  object-fit: cover;
  width: 100%;
  max-height: 400px;
  border-radius: ${borderRadiusXS};

  @media ${mediaConfined} {
    max-height: 500px;
  }
`;

const StyledCaption = styled(Caption)`
  display: block;
`;

export const Image = ({ data: { url, caption } }: ImageBlockProps) => {
  if (!url) return null;

  return (
    <ImageContainer>
      <StyledImage
        src={url}
        alt={caption ?? 'Blog post image without caption'}
      />
      {caption && <StyledCaption noMargin>{caption}</StyledCaption>}
    </ImageContainer>
  );
};
