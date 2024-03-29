import styled from 'styled-components';

import { spaceS } from '@smartcoorp/ui/tokens';

import { TextBoxField } from '../text-box-field/text-box-field.styles';

export const UploadFileButton = styled(TextBoxField)`
  width: 100%;
  margin: ${spaceS} 0;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.common.backgroundColor};
  }
`;
