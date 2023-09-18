import {
  BsColumnsGap,
  BsEmojiSunglasses,
  BsGraphUp,
  BsImages,
  BsLink,
  BsLink45Deg,
  BsPen,
  BsTelephoneInbound,
  BsUpload,
} from 'react-icons/bs';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Col, Row } from '@smartcoorp/ui/grid';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL, spaceXS } from '@smartcoorp/ui/tokens';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

import { SectionContainer } from '../shared-styled-components';

import {
  PricingWrapper,
  SnippetIcon,
  SnippetsWrapper,
  Wrapper,
} from './pricing.styles';

export type PricingSnippet = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export const pricingSnippets: PricingSnippet[] = [
  {
    title: 'Chain-Based Rendering',
    description:
      'Leverage the powerful chain-based rendering for intricate content structures.',
    icon: <BsLink size={20} />,
  },
  {
    title: '5 Blog Posts',
    description: 'Create and manage up to 5 blog posts.',
    icon: <BsPen size={20} />,
  },
  {
    title: '5 Images per Blog Post',
    description: 'Add up to 5 images to each blog post.',
    icon: <BsImages size={20} />,
  },
  {
    title: 'Priority Support',
    description: 'Receive priority customer support for quicker assistance.',
    icon: <BsTelephoneInbound size={20} />,
  },
];

export const Pricing = () => {
  return (
    <SectionContainer>
      <WidthLimiter>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Headline size="large" sizeConfined="xxlarge" forwardedAs="h2">
            Pricing
          </Headline>
          <Body
            size="medium"
            sizeConfined="large"
            variant="neutral"
            style={{
              marginBottom: space3XL,
            }}
          >
            Discover the Perfect Plan to Power Your Content Journey
          </Body>
        </div>
        <Wrapper>
          <Row noMargin>
            <Col size={12} sizeConfined={4}>
              <PricingWrapper>
                <Body
                  size="xsmall"
                  fontWeight="bold"
                  className="dark-neutral"
                  noMargin
                >
                  Essential
                </Body>
                <Headline as="p" size="xxxlarge" noMargin>
                  $0
                </Headline>
                <Body size="xsmall" variant="neutral" noMargin>
                  Free forever
                </Body>
                <Button>Start Crafting Now</Button>

                <Body
                  size="xsmall"
                  fontWeight="bold"
                  className="dark-neutral"
                  noMargin
                >
                  All the essential features you need to start crafting your
                  posts
                </Body>
              </PricingWrapper>
            </Col>
            <Col size={12} sizeConfined={8}>
              <SnippetsWrapper>
                {pricingSnippets.map(({ title, description, icon }) => {
                  return (
                    <div key={title}>
                      <SnippetIcon>{icon}</SnippetIcon>
                      <div>
                        <Body
                          size="medium"
                          fontWeight="bold"
                          noMargin
                          style={{
                            lineHeight: '20px',
                            marginBottom: spaceXS,
                          }}
                        >
                          {title}
                        </Body>
                        <Body size="xsmall" variant="neutral" noMargin>
                          {description}
                        </Body>
                      </div>
                    </div>
                  );
                })}
              </SnippetsWrapper>
            </Col>
          </Row>
        </Wrapper>
      </WidthLimiter>
    </SectionContainer>
  );
};
