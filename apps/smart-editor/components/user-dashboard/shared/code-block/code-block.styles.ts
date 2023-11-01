'use client';

import styled from 'styled-components';

import {
  borderRadiusS,
  gray300,
  gray800,
  motionEasingEnter,
  motionTimeS,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
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
  max-width: 100%;
  margin-block: ${spaceXL};

  pre {
    padding: ${spaceL};
    font-size: 14px;
    margin: 0;
    min-width: 0;
    overflow-x: auto;
  }

  &:hover ${CodeBlockIconsContainer} {
    opacity: 1;
  }
`;
