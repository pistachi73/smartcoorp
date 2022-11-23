/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';
import { z } from 'zod';

type ProtectedRoute =
  | {
      isProtected: true;
      protectionRoles: string[];
    }
  | {
      isProtected?: false;
      protectionRoles?: never;
    };

export type CRUDProps<Document> = {
  model: mongoose.Model<Document, {}, {}, {}, any>;
  zodModelInput: z.ZodObject<any>;
  options: {
    getById?: ProtectedRoute;
    getAll?: ProtectedRoute;
    add?: ProtectedRoute;
    update?: ProtectedRoute;
    delete?: ProtectedRoute;
  };
};

export type CRUDFunctionProps<Document> = {
  model: mongoose.Model<Document, {}, {}, {}, any>;
} & ProtectedRoute;

export type CRUDFunctionPropsWithZod<Document> = CRUDFunctionProps<Document> & {
  zodModelInput: z.ZodObject<any>;
};
