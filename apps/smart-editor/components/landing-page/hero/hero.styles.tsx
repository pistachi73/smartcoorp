'use client';

import { css, styled } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { DeviceOnly } from '@smartcoorp/ui/device-only';
import { Headline } from '@smartcoorp/ui/headline';
import {
  mediaConfined,
  mediaWide,
  primary,
  scale040,
  scale310,
  scale350,
  scale370,
  space3XL,
  space4XL,
  space5XL,
  spaceL,
  spaceM,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

//------HERO TEXT SECTION-----

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: ${spaceXXL};
`;

export const StyledHeadline = styled(Headline).attrs({
  size: 'xlarge',
  sizeConfined: 'xxxlarge',
})<{ $colored?: boolean }>`
  text-align: center;

  ${({ $colored }) =>
    $colored &&
    css`
      background: -webkit-linear-gradient(
        0deg,
        #ff5e0e 30.25%,
        #2e3039 206.44%
      );
      background: linear-gradient(0deg, #ff5e0e 30.25%, #2e3039 206.44%);

      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
`;

export const Subtitle = styled(Body)`
  max-width: 400px;

  text-align: center !important;

  @media ${mediaWide} {
    max-width: 600px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceM};
`;

//------HERO ILLUSTRATION SECTION-----

export const IllustrationsContainer = styled.div`
  width: 100%;
  margin-top: ${space4XL};

  display: flex;
  gap: ${spaceXL};
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;

  @media ${mediaConfined} {
    margin-top: ${space5XL};
    flex-direction: row;
    gap: 0;
  }
`;

export const ImgContainer = styled.div`
  position: relative;
  height: ${scale370};

  display: flex;
  align-items: center;
  justify-content: center;

  aspect-ratio: 1;

  @media ${mediaConfined} {
    height: ${scale310};
  }

  @media ${mediaWide} {
    height: ${scale350};
  }
`;

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
`;

export const IllustrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  gap: ${spaceM};
  @media ${mediaConfined} {
    gap: ${space3XL};
  }
`;

export const IllustrationTitle = styled(Headline).attrs({
  noMargin: true,
})`
  position: relative;
`;

export const Stick = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;

  ${({ $position }) =>
    $position === 'right'
      ? css`
          left: calc(100% + ${spaceXL});
        `
      : css`
          right: calc(100% + ${spaceXL});
        `}

  transform: translateY(-50%);
  width: 100px;
  height: 2px;
  background-color: ${primary};

  @media ${mediaWide} {
    width: 150px;
  }
`;
export const Dot = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;

  ${({ $position }) =>
    $position === 'right'
      ? css`
          left: calc(100% + ${spaceXL});
        `
      : css`
          right: calc(100% + ${spaceXL});
        `}
  transform: translateY(-50%);
  width: ${scale040};
  height: ${scale040};
  border-radius: 50%;
  background-color: ${primary};
`;

export const IllustrationStick = ({
  position,
}: {
  position: 'left' | 'right';
}) => {
  return (
    <DeviceOnly allowedDevices={['desktop', 'tablet']}>
      <Dot $position={position} />
      <Stick $position={position} />
    </DeviceOnly>
  );
};
