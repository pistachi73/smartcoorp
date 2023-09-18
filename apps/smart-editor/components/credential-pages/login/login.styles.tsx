'use client';

import { styled } from 'styled-components';

import { Button } from '@smartcoorp/ui/button';
import {
  borderRadiusM,
  borderRadiusS,
  gray300,
  gray600,
  gray900,
  mediaWide,
  mediaXWide,
  primary,
  space3XL,
  space4XL,
  space5XL,
  spaceL,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  /* max-width: 1200px; */

  margin: auto;
  padding: ${spaceXXL};

  display: flex;
  gap: ${spaceXL};

  @media ${mediaWide} {
    padding: ${space4XL};
  }
`;

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

//------- FORM SECTION -------

export const FormWrapper = styled(Wrapper)`
  align-items: center;
  padding: ${space3XL};

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${spaceXXL};
    width: 100%;

    @media ${mediaXWide} {
      width: 75%;
      min-width: 435px;
    }
  }
`;

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

  span {
    color: ${gray600};
  }
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
  max-height: 100%;
`;

export const Illustration = styled.img`
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
`;
