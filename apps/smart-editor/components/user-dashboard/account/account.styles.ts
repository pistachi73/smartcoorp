'use client';
import styled, { css } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import {
  borderRadiusS,
  gray300,
  mediaSmall,
  mediaWide,
  scale140,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
  yellow600,
} from '@smartcoorp/ui/tokens';

const padding = css`
  padding: ${spaceM} ${spaceL};

  @media ${mediaWide} {
    padding: ${spaceL} ${spaceXL};
  }
`;

export const HeadingContainer = styled.div`
  border-bottom: 1px solid ${gray300};
  ${padding}

  h2 {
    margin-block: ${spaceS};
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spaceXL};
  /* max-width: 416px;
  margin-block: ${spaceXL};
  ${padding} */
`;

export const FormFieldContainer = styled.div`
  max-width: 416px;
  margin-block: ${spaceL};
`;

export const FieldContent = styled.div`
  ${padding}
`;
export const FieldFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: ${spaceM};

  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${gray300};

  padding: ${spaceS} ${spaceL};

  @media ${mediaSmall} {
    flex-direction: row;

    p {
      line-height: ${scale140};
    }
  }

  @media ${mediaWide} {
    padding: ${spaceS} ${spaceXL};
  }

  div {
    margin: 0 !important;
  }
`;

export const FieldContainer = styled.div`
  max-width: 768px;
  border-radius: ${borderRadiusS};
  border: 1px solid ${gray300};
`;

export const Provider = styled.div`
  border-top: 1px solid ${gray300};

  ${padding}
`;

export const WarningSign = styled(Body)`
  color: ${yellow600};

  display: flex;
  align-items: center;
  gap: ${spaceS};
`;
