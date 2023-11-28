'use client';

import { css, styled } from 'styled-components';

import {
  borderRadiusS,
  gray300,
  gray900,
  mediaWide,
  scale150,
  space4XL,
  spaceL,
  spaceM,
  spaceXS,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

export const TryEditorContainer = styled.div`
  padding-block: ${space4XL};
  position: relative;
`;

export const BackgroundReactangle = styled.div`
  width: 100%;
  height: 50%;

  position: absolute;
  top: 410px;
  left: 0;

  background-color: ${gray900};
  z-index: 0;
`;

export const RenderBlockJSONContainer = styled.div`
  padding: ${spaceXXL};
  padding-left: 0;
  font-family: Recursive, monospace;

  height: calc(100vh - 36px);

  flex-grow: 1;
  overflow-y: scroll;
`;

export const RenderBlocksContainer = styled.div`
  width: 100%;
  min-height: 100%;
  width: 100%;
  flex-basis: auto;
  margin-block: 60px;
  margin: 0 auto;

  position: sticky;
  top: 0;
  z-index: 20;

  border-radius: ${borderRadiusS};
  border: 1px solid ${gray300};
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadow.shadowM};

  @media ${mediaWide} {
    width: 35%;
  }
`;

export const PostEditorContainer = styled.div`
  width: 100%;
  @media ${mediaWide} {
    width: 65%;
  }
`;

export const RenderBlocksToolbarContainer = styled.div`
  padding: ${spaceXS};

  height: ${scale150};

  position: sticky;
  top: 0;
  z-index: 10;

  display: flex;
  align-items: center;

  background-color: white;
  border-top-left-radius: ${borderRadiusS};
  border-top-right-radius: ${borderRadiusS};

  ${({ theme }) =>
    css`
      border-bottom: 1px solid ${theme.form.placeholderColor};
    `}
`;

export const PostEditorAndRenderContainer = styled.div`
  width: 100%;
  max-width: 1400px;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spaceL};
  padding-inline: ${spaceM};

  @media ${mediaWide} {
    flex-direction: row;
    align-items: flex-start;
  }
`;
