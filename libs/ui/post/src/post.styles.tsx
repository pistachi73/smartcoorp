'use client';

import styled, { css } from 'styled-components';

import { mediaConfined, mediaWide } from '@smartcoorp/ui/tokens';

const PostContainer = styled.div`
  max-width: 996px;

  width: 87%;

  @media ${mediaConfined} {
    width: 80%;
  }

  @media ${mediaWide} {
    width: 60%;
  }
`;

export const Styled = { PostContainer };
