import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { gray500, gray600 } from '@smartcoorp/ui/tokens';

import { FeatureType } from './features';
import { FeatureContainer, FeatureIconContainer } from './style';

export const Feature = ({ title, icon, description }: FeatureType) => {
  return (
    <FeatureContainer>
      <FeatureIconContainer>{icon}</FeatureIconContainer>
      <Headline size="medium" sizeConfined="large" as="h3">
        {title}
      </Headline>
      <Body variant="neutral" noMargin size="small" sizeConfined="medium">
        {description}
      </Body>
    </FeatureContainer>
  );
};
