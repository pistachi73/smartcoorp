import { BsLink45Deg } from 'react-icons/bs';
import styled from 'styled-components';

import {
  borderRadiusS,
  primary,
  spaceL,
  spaceM,
  spaceXL,
  spaceXXL,
} from '../../../../tokens';
import { Body } from '../../../body';
import { DotLoading as DotLoadingComponent } from '../../../dot-loading';
import { InputBox } from '../../post-editor.styles';

export const MetaDataContainer = styled.a`
  position: relative;
  padding: ${spaceXL};
  margin: ${spaceL} 0;

  display: flex;

  border: 1px solid;
  border-color: ${({ theme }) => theme.common.overBackgroundNeutral};
  border-radius: ${borderRadiusS};
  box-shadow: ${({ theme }) => theme.shadow.shadowS};

  :focus {
    transition: outline-offset 75ms ease-out;
    outline-color: ${primary};
    outline-width: 6px;
  }
`;

export const MetaDomain = styled(Body)`
  color: ${({ theme }) => theme.common.overBackgroundNeutral};
`;

export const MetaDescription = styled(Body)`
  -webkit-line-clamp: 3;
`;

export const MetaImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledInputBox = styled(InputBox)`
  padding-left: ${spaceXXL};
`;

export const DotLoading = styled(DotLoadingComponent)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LinkIcon = styled(BsLink45Deg)<{
  $loading?: boolean;
  $error?: boolean;
}>`
  position: absolute;
  z-index: 100;
  top: 50%;
  transform: translateY(-50%);
  left: ${spaceM};
  color: ${({ $loading, $error, theme }) =>
    $error
      ? theme.common.errorColor
      : $loading
      ? theme.common.disabledSurfaceColor
      : theme.color.neutral};
`;

export const Container = styled.div``;
