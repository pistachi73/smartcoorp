import styled from 'styled-components';

import {
  borderRadiusS,
  gray300,
  scale150,
  scale400,
  spaceM,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url('./bg-login.svg');
  background-size: cover;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  height: ${scale150};
  position: relative;
  position: absolute;

  top: calc(-${scale150} - ${spaceXXL});
  left: 0;
  right: 0;
`;
export const LoginContainer = styled.div`
  width: 25%;
  min-width: ${scale400};
`;

export const LoginForm = styled.form`
  position: relative;
  width: 100;
  padding: ${spaceXL};
  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  border-radius: ${borderRadiusS};
  border: 1px solid ${gray300};

  background-color: ${({ theme }) => theme.backgroundScreen};
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(2000px);
`;

export const InputContainer = styled.div`
  margin-bottom: ${spaceM};
`;
