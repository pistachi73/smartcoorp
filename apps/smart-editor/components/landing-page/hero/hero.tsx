import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

import {
  ButtonsContainer,
  HeroContainer,
  HeroContent,
  IllustrationContainer,
  IllustrationStick,
  IllustrationTitle,
  IllustrationsContainer,
  Img,
  ImgContainer,
  StyledHeadline,
  Subtitle,
} from './style';

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
    <HeroContainer>
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
          Unlock limitless creative control to shape your story precisely as you
          envision, revolutionising how you craft content.
        </Subtitle>
        <ButtonsContainer>
          <Button href="#try-editor">Start Crafting</Button>
          <Button href="#try-editor" variant="secondary">
            Try the Editor!
          </Button>
        </ButtonsContainer>
      </HeroContent>
      <IllustrationsContainer>
        {illustrations.map(({ src, title, sticks }) => (
          <IllustrationContainer key={title}>
            <ImgContainer>
              <Img src={src} alt={title} />
            </ImgContainer>
            <IllustrationTitle size="medium" forwardedAs={'div'}>
              <p>{title}</p>
              {sticks.map((position) => (
                <IllustrationStick key={position} position={position} />
              ))}
            </IllustrationTitle>
          </IllustrationContainer>
        ))}
      </IllustrationsContainer>
    </HeroContainer>
  );
};
