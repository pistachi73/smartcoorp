import { faker } from '@faker-js/faker';
import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

export const UserZod = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  passwordHash: z.string(),
  salt: z.string(),
  isVerified: z.boolean(),
  verificationString: z.string(),
  passwordResetCode: z.string().nullish(),
  roles: z.array(z.string()).nullish(),
});

type test = typeof UserZod;

export type UserInput = z.infer<typeof UserZod>;

export interface UserDocument extends UserInput {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  __v: number;
}

const UserSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
      required: [true, 'Please enter Email Address'],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    salt: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    verificationString: { type: String, required: true },
    roles: [{ type: String }],
    passwordResetCode: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>('User', UserSchema);

export const getUserInput = (): UserInput => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  passwordHash: faker.internet.password(),
  salt: faker.datatype.uuid(),
  isVerified: faker.datatype.boolean(),
  verificationString: faker.datatype.uuid(),
});
