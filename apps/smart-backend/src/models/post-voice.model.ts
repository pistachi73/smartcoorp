import { faker } from '@faker-js/faker';
import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

export const PostVoiceZod = z.object({
  person_name: z.string(),
  voice_name: z.string(),
  code: z.string(),
  gender: z.string(),
  flag: z.string(),
  languaje: z.string(),
});

export type PostVoiceInput = z.infer<typeof PostVoiceZod>;

export interface PostVoiceDocument extends PostVoiceInput {
  updatedAt: Date;
  createdAt: Date;
  __v: number;
}

const PostVoiceSchema = new Schema<PostVoiceDocument>(
  {
    person_name: {
      type: String,
      required: true,
      unique: true,
    },
    voice_name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    languaje: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PostVoice = mongoose.model<PostVoiceDocument>(
  'PostVoice',
  PostVoiceSchema
);

export const getPostVoiceInput = (): PostVoiceInput => ({
  person_name: faker.name.firstName(),
  voice_name: faker.name.lastName(),
  code: faker.datatype.uuid(),
  flag: faker.address.countryCode(),
  gender: faker.name.gender(),
  languaje: faker.address.country(),
});
