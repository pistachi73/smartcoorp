'use client';

import styled, { css } from 'styled-components';

import { ModalContent } from '@smartcoorp/ui/modal';
import {
  borderRadiusXS,
  gray200,
  gray300,
  gray400,
  gray500,
  green100_RGBA,
  green400,
  green600,
  motionEasingStandard,
  motionTimeM,
  scale070,
  scale140,
  spaceL,
  spaceM,
  yellow100,
  yellow500,
  yellow700,
} from '@smartcoorp/ui/tokens';

export const StyledModalContent = styled(ModalContent)`
  width: 350px !important;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spaceL};
  margin-top: ${spaceL};
`;

export const ApiKeyContainer = styled.button<{ $apiKeyCopied: boolean }>`
  width: 100%;
  height: ${scale140};
  padding-inline: ${spaceM};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spaceM};

  font-size: ${scale070};
  border-radius: ${borderRadiusXS};

  transition-property: background-color, border-color;
  transition-duration: ${motionTimeM};
  transition-timing-function: ${motionEasingStandard};

  ${({ $apiKeyCopied }) => css`
    border: 1px solid ${$apiKeyCopied ? green400 : gray300};
    background-color: ${$apiKeyCopied
      ? `rgba(${green100_RGBA}, 0.5)`
      : gray200};

    color: ${$apiKeyCopied ? green600 : gray500} !important;

    p {
      color: ${$apiKeyCopied ? green600 : gray500} !important;
    }

    &:hover {
      background-color: ${$apiKeyCopied
        ? `rgba(${green100_RGBA}, 0.5)`
        : gray300};

      border-color: ${$apiKeyCopied ? green400 : gray400};
    }
  `}
`;

export const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spaceM};

  padding: ${spaceM};

  border-radius: ${borderRadiusXS};
  border: 1px solid ${yellow500};
  background-color: ${yellow100};

  svg,
  p {
    color: ${yellow700};
  }
`;

export const CTAContainer = styled.div`
  display: flex;
  justify-content: end;

  button {
    width: max-content;
  }
`;
