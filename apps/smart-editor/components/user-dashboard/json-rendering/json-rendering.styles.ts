'use client';

import styled from 'styled-components';

import {
  borderRadiusXS,
  mediaConfined,
  mediaWide,
  mediaXWide,
  primary100_RGBA,
  primary300,
  scale070,
  space3XL,
  spaceM,
  spaceXL,
  spaceXS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  gap: ${space3XL};

  @media ${mediaConfined} {
    overflow: unset;
    display: grid;
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
    }

    ol {
      list-style-type: decimal;
    }

    ul,
    ol {
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

    p {
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
`;
