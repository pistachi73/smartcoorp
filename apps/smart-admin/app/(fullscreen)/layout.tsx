'use client';

import styled from 'styled-components';

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('./bg-login.jpg');
  background-size: cover;
`;

const FullScreenLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default FullScreenLayout;
