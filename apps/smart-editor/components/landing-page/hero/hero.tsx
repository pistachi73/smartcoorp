import Image from 'next/image';

import { Button } from '@smartcoorp/ui/button';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

import { SectionContainer } from '../shared-styled-components';

import {
  ButtonsContainer,
  HeroContent,
  IllustrationContainer,
  IllustrationStick,
  IllustrationTitle,
  IllustrationsContainer,
  ImgContainer,
  StyledHeadline,
  Subtitle,
} from './hero.styles';

const illustrations: {
  title: string;
  src: string;
  sticks: ('left' | 'right')[];
}[] = [
  {
    title: 'Craft',
    src: './illustrations/craft.svg',
    sticks: ['right'],
  },
  {
    title: 'Convert to JSON',
    src: './illustrations/convert-to-JSON.svg',
    sticks: ['left', 'right'],
  },
  {
    title: 'Publish',
    src: './illustrations/publish.svg',
    sticks: ['left'],
  },
];

export const Hero = () => {
  return (
    <SectionContainer>
      <WidthLimiter>
        <HeroContent>
          <div>
            <StyledHeadline forwardedAs={'h1'} $colored>
              Blogging redefined:
            </StyledHeadline>
            <StyledHeadline forwardedAs={'h1'}>
              Seamlessly transition from words
            </StyledHeadline>
            <StyledHeadline forwardedAs={'h1'}>
              to JSON-powered content.
            </StyledHeadline>
          </div>
          <Subtitle
            size="medium"
            sizeConfined="large"
            lineHeight="increased"
            variant="neutral"
            noMargin
          >
            Unlock limitless creative control to shape your story precisely as
            you envision, revolutionising how you craft content.
          </Subtitle>
          <ButtonsContainer>
            <Button href="/signup">Start Crafting</Button>
            <Button href="#try-editor" variant="secondary">
              Try the Editor!
            </Button>
          </ButtonsContainer>
        </HeroContent>
        <IllustrationsContainer>
          {illustrations.map(({ src, title, sticks }) => (
            <IllustrationContainer key={title}>
              <ImgContainer>
                <Image src={src} alt={title} fill priority />
              </ImgContainer>
              <IllustrationTitle size="medium" forwardedAs={'div'}>
                {title}
                {sticks.map((position) => (
                  <IllustrationStick key={position} position={position} />
                ))}
              </IllustrationTitle>
            </IllustrationContainer>
          ))}
        </IllustrationsContainer>
      </WidthLimiter>
    </SectionContainer>
  );
};
