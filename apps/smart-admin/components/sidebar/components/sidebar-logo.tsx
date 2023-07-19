import { styled } from 'styled-components';

import Image from 'next/image';

import { useBreakpoint } from '@smartcoorp/smart-hooks';
import { mediaWide, scale130, spaceL, spaceM } from '@smartcoorp/ui/tokens';

const xSpacing = spaceM;
const xSpacingWide = spaceL;

export const LogoContainer = styled.div`
  margin: ${xSpacing};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (${mediaWide}) {
    margin: ${xSpacingWide};
    display: block;
  }
`;

export const SidebarLogo = () => {
  const { isWide } = useBreakpoint();

  return (
    <LogoContainer>
      <Image
        src={isWide ? '/smart-admin-logo.svg' : '/logo.svg'}
        alt="Smart Admin"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: 'auto', height: scale130 }} // optional
      />
    </LogoContainer>
  );
};
