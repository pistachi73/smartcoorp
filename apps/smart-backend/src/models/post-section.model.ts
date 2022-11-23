import { faker } from '@faker-js/faker';
import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

export const PostSectionZod = z.object({
  name: z.string(),
  tags: z.union([
    z.array(z.instanceof(Schema.Types.ObjectId)),
    z.array(z.string()),
  ]),
});

export type PostSectionInput = z.infer<typeof PostSectionZod>;

export interface PostSectionDocument extends PostSectionInput, Document {
  updatedAt: Date;
  createdAt: Date;
  __v: number;
}

const PostSectionSchema = new Schema<PostSectionDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: 'PostTag' }],
    },
  },
  { timestamps: true }
);

export const PostSection = mongoose.model<PostSectionDocument>(
  'PostSection',
  PostSectionSchema
);

export const getPostSectionInput = (): PostSectionInput => ({
  name: faker.commerce.product(),
  tags: [faker.database.mongodbObjectId()],
});
