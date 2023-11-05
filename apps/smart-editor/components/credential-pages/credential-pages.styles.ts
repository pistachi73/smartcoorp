'use client';

import { styled } from 'styled-components';

import Image from 'next/image';

import { Button } from '@smartcoorp/ui/button';
import {
  borderRadiusM,
  gray100,
  gray300,
  gray900,
  mediaConfined,
  mediaWide,
  mediaXWide,
  space3XL,
  space4XL,
  space5XL,
  spaceL,
  spaceM,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  margin: auto;
  padding: ${spaceM};

  display: flex;
  gap: ${spaceXL};

  background-color: ${gray100};

  @media ${mediaConfined} {
    padding: ${spaceXXL};
  }

  @media ${mediaWide} {
    padding: ${space4XL};
  }
`;

// ------- SHARED COMPONENTS -------
const Wrapper = styled.div`
  padding: ${space3XL};

  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  width: 50%;

  @media ${mediaWide} {
    padding: ${space4XL};
  }
  @media ${mediaXWide} {
    padding: ${space5XL};
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spaceXXL};
  width: 100%;

  @media ${mediaXWide} {
    width: 75%;
    min-width: 435px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${spaceXL};
  }
`;

// ------- FORM SECTION -------
export const FormWrapper = styled(Wrapper)`
  padding: 0;
  align-items: center;
  position: relative;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${spaceXXL};
    width: 100%;

    @media ${mediaConfined} {
      padding: ${spaceXXL};
    }
    @media ${mediaXWide} {
      width: 75%;
      min-width: 435px;
    }
  }
`;

export const LogoImg = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
`;

//------- ILLUSTRATION SECTION -------

export const IllustrationWrapper = styled(Wrapper)`
  position: relative;
  border-radius: ${borderRadiusM};
  background-color: ${gray900};
`;

export const IllustrationsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
`;

export const Illustration = styled.div`
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
`;

// ------- OR COMPONENT -------

export const Or = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spaceL};
  /* margin-top: ${spaceXL};
  margin-bottom: ${spaceXL}; */

  div {
    width: 100%;
    height: 1px;
    background-color: ${gray300};
  }
`;

// ------- GOOGLE BUTTON COMPONENT -------

export const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  border-color: ${gray300};
  background-color: white;

  img {
    margin-right: ${spaceL};
  }

  span {
    font-weight: 400;
    letter-spacing: 0em;
  }
`;
