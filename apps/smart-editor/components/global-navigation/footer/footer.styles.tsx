'use client';

import { css, styled } from 'styled-components';

import Image from 'next/image';
import Link from 'next/link';

import {
  borderRadiusXS,
  focusShadow,
  motionEasingStandard,
  motionTimeS,
  primary,
  primary100,
  scale200,
  spaceL,
  spaceS,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

export const RelativeWidthLimiter = styled(WidthLimiter)`
  padding-top: ${spaceXXL};
  position: relative;
  overflow: hidden;
`;

export const FooterContainer = styled.footer`
  position: relative;

  ${({ theme: { SmartEditor } }) => css`
    background-color: ${SmartEditor.header.backgroundColor};
    border-top: 1px solid ${SmartEditor.header.borderColor};
  `}
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: end;
  gap: ${spaceS};
`;

export const ContactsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceXL};
`;

export const ContactContainer = styled(Link)`
  position: relative;
  width: ${scale200};
  padding: ${spaceL};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${primary};
  border-radius: ${borderRadiusXS};

  aspect-ratio: 1;

  transition: background-color ${motionTimeS} ${motionEasingStandard};

  &:hover {
    background-color: ${primary100};
  }
  &:focus {
    ${focusShadow}
  }

  div {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

export const Illustration = styled(Image)`
  position: absolute;
  right: ${spaceXXL};
  bottom: -${spaceL};
`;
