import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

import { SectionContainer } from '../shared-styled-components';

import { PostEditorTrial } from './post-editor-trial';
import { BackgroundReactangle } from './style';

export const TryEditor = () => {
  return (
    <SectionContainer
      style={{
        position: 'relative',
      }}
    >
      <WidthLimiter>
        <Headline
          size="large"
          sizeConfined="xxlarge"
          forwardedAs="h2"
          style={{
            marginBottom: space3XL,
            textAlign: 'center',
          }}
        >
          Experience the Magic Yourself
        </Headline>
      </WidthLimiter>
      <PostEditorTrial />
      <BackgroundReactangle />
    </SectionContainer>
  );
};
