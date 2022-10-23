import styled from 'styled-components';
/* eslint-disable-next-line */
export interface SmartDesignProps {}

const StyledSmartDesign = styled.div`
  color: pink;
`;

export function SmartDesign(props: SmartDesignProps) {
  return (
    <StyledSmartDesign>
      <h1>Welcome to SmartDesign!</h1>
    </StyledSmartDesign>
  );
}

export default SmartDesign;
