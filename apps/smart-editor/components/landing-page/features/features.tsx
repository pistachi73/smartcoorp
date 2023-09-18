import {
  BsColumnsGap,
  BsEmojiSunglasses,
  BsGraphUp,
  BsUpload,
} from 'react-icons/bs';

import { Body } from '@smartcoorp/ui/body';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

import { SectionContainer } from '../shared-styled-components';

import { FeatureContainer, FeatureIconContainer } from './features.styles';

export type FeatureType = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export const features: FeatureType[] = [
  {
    title: 'Export ready',
    description:
      "Generate JSON output that's readily usable for web development projects, providing developers with clean and organized data to work with.",
    icon: <BsUpload size={68} />,
  },
  {
    title: 'User-Friendly Learning Curve',
    description:
      'Benefit from an intuitive interface that requires minimal learning, ensuring that both beginners and experienced users can leverage the tool effectively.',
    icon: <BsEmojiSunglasses size={68} />,
  },
  {
    title: 'Dynamic Column Creation',
    description:
      'Create visually appealing layouts by organizing content blocks into customizable columns, providing a clean and professional look to your output.',
    icon: <BsColumnsGap size={68} />,
  },
  {
    title: 'Continuous Updates',
    description:
      ' Stay ahead with regular updates that bring enhancements and new features to enrich your content creation experience.',
    icon: <BsGraphUp size={68} />,
  },
];

export const Features = () => {
  return (
    <SectionContainer>
      <WidthLimiter>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Headline size="large" sizeConfined="xxlarge" forwardedAs="h2">
            Transform and Customise Your Content
          </Headline>
          <Body
            size="medium"
            sizeConfined="large"
            variant="neutral"
            style={{
              marginBottom: space3XL,
            }}
          >
            Elevate Your Content with Chain-Based JSON Rendering
          </Body>
        </div>
        <Grid>
          <Row>
            {features.map(({ icon, title, description }, index) => (
              <Col
                size={12}
                sizeConfined={6}
                sizeWide={5}
                offset={0}
                offsetWide={index % 2 === 0 ? 1 : 0}
                key={title}
              >
                <FeatureContainer>
                  <FeatureIconContainer>{icon}</FeatureIconContainer>
                  <Headline size="medium" sizeConfined="large" as="h3">
                    {title}
                  </Headline>
                  <Body
                    variant="neutral"
                    noMargin
                    size="small"
                    sizeConfined="medium"
                  >
                    {description}
                  </Body>
                </FeatureContainer>
              </Col>
            ))}
          </Row>
        </Grid>
      </WidthLimiter>
    </SectionContainer>
  );
};
