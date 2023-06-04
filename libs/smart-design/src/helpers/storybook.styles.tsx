import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title as TitleComponent,
} from '@storybook/blocks';
import styled from 'styled-components';

import { Hero } from '../components';
import { gray300, scale100, spaceL, spaceM, spaceS, spaceXL } from '../tokens';

export const Title = styled(Hero)`
  margin-bottom: ${spaceM};
  font-size: ${scale100};
`;

export const SelectContainer = styled.div`
  margin-bottom: ${spaceL};
  margin-top: ${spaceS};
  width: 250px;
  min-width: 250px;
`;

export const Divider = styled.div`
  margin: ${spaceL} 0;
  width: 100%;
  border-bottom: 1px solid ${gray300};
`;

export const Styled = {
  Hero,
  Title,
  SelectContainer,
  Divider,
};
