import { faker } from '@faker-js/faker';
import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

export const PostTagZod = z.object({
  name: z.string(),
  color: z.string(),
});

export type PostTagInput = z.infer<typeof PostTagZod>;

export type PostTagDocument = MongooseDocument & PostTagInput;

type MongooseDocument = {
  id?: string;
  updatedAt: Date;
  createdAt: Date;
  __v: number;
};

const colorValidator = (v: string) => {
  return /^#[0-9A-F]{6}$/i.test(v);
};

const PostTagSchema = new Schema<PostTagDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
      unique: true,
      validate: [colorValidator, 'Color not valid'],
    },
  },
  { timestamps: true }
);
export const PostTag = mongoose.model<PostTagDocument>(
  'PostTag',
  PostTagSchema
);

export const getPostTagInput = (): PostTagInput => ({
  name: faker.commerce.product(),
  color: faker.color.rgb({ format: 'hex', casing: 'lower' }),
});
