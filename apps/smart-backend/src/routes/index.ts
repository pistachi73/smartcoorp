import { mediaRouter } from './media/media.routes';
import { metadataRouter } from './metadata/metadata.routes';
import { postTagRouter } from './post-tag/post-tag.routes';
import { userRouter } from './user/user.routes';

export const routes = {
  postTag: postTagRouter,
  user: userRouter,
  metadata: metadataRouter,
  media: mediaRouter,
};
