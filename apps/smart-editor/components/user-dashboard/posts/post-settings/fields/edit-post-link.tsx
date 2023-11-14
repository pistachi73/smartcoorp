'use client';

import {
  FieldContainer,
  FieldContent,
} from '@smart-editor/components/shared/styled-form-field';
import styled from 'styled-components';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import {
  getFocusShadow,
  motionEasingStandard,
  motionTimeM,
  primary,
  primary100_RGBA,
} from '@smartcoorp/ui/tokens';

const StyledFieldContainer = styled(FieldContainer)`
  border-color: ${primary};

  transition-property: transform, box-shadow, border-color, background-color;
  transition-duration: ${motionTimeM};
  transition-timing-function: ${motionEasingStandard};
  background-color: rgba(${primary100_RGBA}, 0.1);

  &:hover {
    text-decoration: none;
    background-color: rgba(${primary100_RGBA}, 0.25);
    border-color: ${primary};
  }
  &:focus-visible {
    ${getFocusShadow({ withTransition: false })}
  }
`;

export const EditPostLink = () => {
  const { postId } = useParams();
  return (
    <StyledFieldContainer as={Link} href={`/posts/${postId}/edit`}>
      <FieldContent>
        <Headline size="large">Edit blog post content</Headline>
        <Body size="small" noMargin>
          Edit the content of your blog post. This link will open the editor in
          a new tab.
        </Body>
      </FieldContent>
    </StyledFieldContainer>
  );
};
