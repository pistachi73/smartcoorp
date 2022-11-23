import { Model } from 'mongoose';

import { crud } from '../../helpers';
import { protectedProcedure } from '../../middlewares/has-roles';
import {
  PostTag,
  PostTagDocument,
  PostTagZod,
} from '../../models/post-tag.model';
import { publicProcedure, router } from '../../utils/trpc';

const { getById, getAll, add, update } = crud<PostTagDocument>({
  model: PostTag,
  zodModelInput: PostTagZod,
  options: {
    add: {
      isProtected: true,
      protectionRoles: ['admin'],
    },
    update: {
      isProtected: true,
      protectionRoles: ['admin'],
    },
  },
});

export const postTagRouter = router({
  protected: protectedProcedure(['admin']).query(({ ctx }) => {
    return { message: ctx.user };
  }),
  getAll,
  getById,
  add,
  update,
});
