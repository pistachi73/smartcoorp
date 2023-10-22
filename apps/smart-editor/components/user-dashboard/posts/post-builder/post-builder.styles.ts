import styled from 'styled-components';

import {
  borderRadiusXS,
  gray100,
  gray200,
  gray300,
  gray500,
  gray700,
  motionEasingStandard,
  motionTimeS,
  primary,
  primary100_RGBA,
  spaceL,
  spaceM,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

export const TabLabelContainer = styled.div`
  /* gap: ${spaceM}; */
`;

export const Header = styled.div`
  margin-bottom: ${spaceXL};

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    gap: ${spaceM};
  }
`;

export const PostInformationContainer = styled.div`
  max-width: 868px;
  margin: 0 auto;
  padding-block: ${spaceL};

  display: grid;
  grid-template-columns: 1fr 2fr;

  row-gap: ${spaceL};
  column-gap: ${spaceXXL};
`;

export const IdContainer = styled.button`
  height: 42px;
  padding-inline: ${spaceM};

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spaceM};

  border: 1px solid ${gray300};
  border-radius: ${borderRadiusXS};
  background-color: ${gray100};

  color: ${gray500};

  transition-property: color, background-color, border-color;
  transition-duration: ${motionTimeS};
  transition-timing-function: ${motionEasingStandard};

  &:hover {
    color: ${gray700};
    background-color: rgba(${primary100_RGBA}, 0.25);
    border-color: ${primary};
    cursor: pointer;
  }
`;
