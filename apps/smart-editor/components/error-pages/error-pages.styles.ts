'use client';
import styled from 'styled-components';

import {
  mediaWide,
  space3XL,
  spaceL,
  spaceM,
  spaceXL,
} from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spaceXL};

  padding: ${spaceXL} ${spaceM};

  @media ${mediaWide} {
    gap: ${space3XL};
    flex-direction: row;
  }

  ul {
    list-style-type: '- ';
    padding-left: ${spaceXL};
    margin-block: ${spaceXL};

    li {
      padding-left: ${spaceM};
      margin-bottom: ${spaceM};
      position: relative;

      a {
        font-weight: bold;
        color: black;
      }
    }
  }
`;

export const IllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;

  @media ${mediaWide} {
    height: 100%;
    width: 350px;
  }
`;

export const TextContainer = styled.div`
  max-width: 450px;
`;

// 500 PAGES
export const InternalServerErrorIllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;

  @media ${mediaWide} {
    width: 250px;
    height: 250px;
  }
`;
export const InternalServerErrorTextContainer = styled.div`
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: ${spaceL};
`;
