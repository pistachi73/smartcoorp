import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { spaceM, spaceS } from '@smartcoorp/ui/tokens';

import { PostCard } from '../post-card';
import { PostCardListProps } from '../post-card.types';

export const PostCardList = ({ posts }: PostCardListProps) => {
  return (
    <Grid>
      <Row>
        {posts.map((post) => (
          <Col size={6} sizeConfined={4} columnSpacing={spaceS}>
            <PostCard {...post} />
          </Col>
        ))}
      </Row>
    </Grid>
  );
};
