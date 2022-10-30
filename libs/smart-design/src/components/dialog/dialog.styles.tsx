import styled from 'styled-components';

import { scale280, scale370, spaceM, spaceXL } from '../../tokens';
import { Button } from '../button';
import { Modal } from '../modal';

type DialogActionsContainerTransientProps = {
  $rejectOption?: boolean;
};

const DialogContainer = styled(Modal)`
  min-width: ${scale280};
  max-width: ${scale370};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DialogActionsContainer = styled.div<DialogActionsContainerTransientProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $rejectOption }) =>
    $rejectOption ? 'space-betweem' : 'center'};
  gap: ${spaceM};

  padding-top: ${spaceXL};
`;

const DialogActionButton = styled(Button)`
  width: 100%;
`;

export const Styled = {
  DialogContainer,
  DialogActionsContainer,
  DialogActionButton,
};
