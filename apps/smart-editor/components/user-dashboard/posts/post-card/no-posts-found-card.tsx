import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

import {
  NoPostsFoundContainer,
  NotFoundImageContainer,
} from './post-card.styles';

export const NoPostsFoundCard = () => {
  return (
    <NoPostsFoundContainer>
      <Headline size="medium">No Posts found</Headline>
      <Body variant="neutral" size="small">
        Posts with this title do not exist. Try another title.
      </Body>
      <NotFoundImageContainer>
        <Image src={'/not-found.svg'} fill alt="Posts Not found illustration" />
      </NotFoundImageContainer>
    </NoPostsFoundContainer>
  );
};
