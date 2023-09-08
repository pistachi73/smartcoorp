'use client';

import { styled } from 'styled-components';

import { Col } from '@smartcoorp/ui/grid';
import {
  borderRadiusS,
  motionEasingStandard,
  motionTimeS,
  primary,
  primary100,
  primary_RGBA,
  space4XL,
  spaceM,
  spaceXL,
} from '@smartcoorp/ui/tokens';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

export const FeaturesContainer = styled(WidthLimiter)`
  padding-block: ${space4XL};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FeatureContainer = styled.div`
  height: 100%;
  padding: ${spaceXL};
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  border: 1px solid ${primary};
  border-radius: ${borderRadiusS};
  overflow: hidden;

  transition: background-color ${motionTimeS} ${motionEasingStandard};

  &:hover {
    background-color: ${primary100};
  }
`;

export const FeatureIconContainer = styled.div`
  position: absolute;
  top: -${spaceM};
  right: -${spaceM};

  color: rgba(${primary_RGBA}, 0.1);
`;
