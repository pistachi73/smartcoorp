'use client';
import styled, { css } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Skeleton } from '@smartcoorp/ui/skeleton';
import {
  borderRadiusS,
  gray300,
  mediaSmall,
  mediaWide,
  red100,
  red500,
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
    padding: ${spaceXL};
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spaceL};
`;

export const FieldContainer = styled.div<{
  $danger?: boolean;
}>`
  max-width: 768px;
  border-radius: ${borderRadiusS};

  ${({ $danger }) =>
    $danger
      ? css`
          border: 1px solid ${red500};
          background-color: ${red100};
        `
      : css`
          border: 1px solid ${gray300};
        `}
`;

export const FieldContent = styled.div`
  ${padding}
`;

export const InputContainer = styled.div`
  max-width: 416px;
  margin-top: ${spaceL};
`;

export const FieldFooter = styled.footer<{ $danger?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spaceM};

  align-items: center;
  justify-content: space-between;

  padding: ${spaceS} ${spaceL};

  ${({ $danger }) =>
    $danger
      ? css`
          border-top: 1px solid ${red500};
        `
      : css`
          border-top: 1px solid ${gray300};
        `}

  p {
    text-align: center;
  }

  @media ${mediaSmall} {
    flex-direction: row;

    p {
      line-height: ${scale140};
      text-align: left;
    }
  }

  @media ${mediaWide} {
    padding: ${spaceS} ${spaceXL};
  }

  div {
    margin: 0 !important;
  }
`;

export const Provider = styled.div`
  border-top: 1px solid ${gray300};

  ${padding}
`;

export const WarningSign = styled(Body)`
  color: ${yellow600};

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${spaceS};
`;

export const SkeletonFormField = () => {
  return (
    <FieldContainer>
      <FieldContent>
        <div
          style={{
            paddingBottom: spaceM,
          }}
        >
          <Skeleton width="100px" height="24px" />
        </div>
        <Skeleton width="360px" height="14px" />
        <Skeleton width="140px" height="14px" />
      </FieldContent>
      <FieldFooter>
        <Skeleton width="240px" height="14px" />
        <Skeleton width="70px" height="24px" />
      </FieldFooter>
    </FieldContainer>
  );
};
