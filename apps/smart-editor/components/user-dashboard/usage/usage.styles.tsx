'use client';

import styled from 'styled-components';

import {
  borderRadiusS,
  borderRadiusXS,
  gray300,
  gray700,
  gray800,
  mediaConfined,
  mediaWide,
  mediaXWide,
  motionEasingEnter,
  motionTimeS,
  primary,
  primary100_RGBA,
  primary300,
  scale060,
  scale070,
  space3XL,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
  spaceXS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${space3XL};

  @media ${mediaConfined} {
    grid-template-columns: 10fr 4fr;
  }
  @media ${mediaWide} {
    grid-template-columns: 10fr 5fr;
  }
  @media ${mediaXWide} {
    grid-template-columns: 10fr 6fr;
  }
`;

export const DocumentationContainer = styled.div`
  section {
    margin-bottom: ${space3XL};

    padding-top: 85px;
    margin-top: -85px;

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

        code {
          background-color: rgba(${primary100_RGBA}, 1);
          color: black;
          padding: ${spaceXXS} ${spaceXS};
          border-radius: ${borderRadiusXS};

          border: 1px solid ${primary300};

          font-weight: bold;
          font-size: ${scale070};
        }
      }
    }

    pre {
      margin-block: ${spaceXL};
      padding: ${spaceL};
      border-radius: ${borderRadiusS};
      border: 1px solid ${gray300};
      border-top: none;
      font-size: 14px;
    }
  }
`;
