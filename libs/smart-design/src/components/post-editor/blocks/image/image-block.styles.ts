import styled from 'styled-components';

import { scale350 } from '../../../../tokens/scale';
import { spaceM, spaceS } from '../../../../tokens/spacing';
import { InputBox } from '../../post-editor.styles';

export const UploadImageButton = styled(InputBox)`
  width: 100%;
  margin: ${spaceS} 0;

  :empty:before {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.common.overBackgroundNeutral};
    :empty:before {
      color: ${({ theme }) => theme.common.backgroundColor};
    }
  }
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  max-width: 100%;
  padding: ${spaceS} 0;
`;

export const ImagePreview = styled.img`
  min-width: 100%;
`;

export const CaptionInputBox = styled(InputBox)`
  margin-top: ${spaceS} !important;
`;
