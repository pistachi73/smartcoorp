'use client';

import styled from 'styled-components';

import {
  gray800,
  motionEasingEnter,
  motionTimeS,
  spaceL,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';

export const CodeBlockIconsContainer = styled.div`
  position: absolute;
  top: ${spaceL};
  right: ${spaceL};

  display: flex;
  align-items: center;
  gap: ${spaceS};
  opacity: 0;

  transition: opacity ${motionTimeS} ${motionEasingEnter};

  button {
    color: white;
    border-color: white;

    padding-inline: ${spaceM};

    &:hover {
      background-color: ${gray800};
    }
  }
`;

export const CodeBlockContainer = styled.div`
  position: relative;

  &:hover ${CodeBlockIconsContainer} {
    opacity: 1;
  }
`;
