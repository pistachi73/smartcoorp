/* eslint-disable @typescript-eslint/ban-types */
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../middlewares/has-roles';
import { publicProcedure } from '../../utils/trpc';

import {
  CRUDFunctionProps,
  CRUDFunctionPropsWithZod,
  CRUDProps,
} from './crud.types';

export const crud = <Document>({
  model,
  zodModelInput,
  options,
}: CRUDProps<Document>) => ({
  getAll: getAll<Document>({
    model,
    ...options.getAll,
  }),

  getById: getById<Document>({
    model,
    ...options.getById,
  }),

  add: add<Document>({
    model,
    zodModelInput,
    ...options.add,
  }),

  update: update<Document>({
    model,
    zodModelInput,
    ...options.update,
  }),
});

export const getAll = <Document>({
  model: Model,
  isProtected,
  protectionRoles,
}: CRUDFunctionProps<Document>) =>
  (isProtected ? protectedProcedure(protectionRoles) : publicProcedure)
    .input(z.object({}).passthrough().nullish())
    .query(async ({ input }) => {
      const documents: Document[] = await Model.find(input ?? {});

      return documents;
    });

export const getById = <Document>({
  model: Model,
  isProtected,
  protectionRoles,
}: CRUDFunctionProps<Document>) =>
  (isProtected ? protectedProcedure(protectionRoles) : publicProcedure)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input: { id } }) => {
      const document: Document | null = await Model.findById(id);

      if (!document)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Document with id: ${id} not found in model: ${Model.modelName}`,
        });

      return document;
    });

export const add = <Document>({
  model: Model,
  zodModelInput,
  isProtected,
  protectionRoles,
}: CRUDFunctionPropsWithZod<Document>) =>
  (isProtected
    ? protectedProcedure(protectionRoles as string[])
    : publicProcedure
  )
    .input(zodModelInput)
    .mutation(async ({ input }) => {
      const newDocument = await Model.create(input);

      const createdDocument = await newDocument.save();

      return createdDocument as Document;
    });

export const update = <Document>({
  model: Model,
  zodModelInput,
  isProtected,
  protectionRoles,
}: CRUDFunctionPropsWithZod<Document>) =>
  (isProtected
    ? protectedProcedure(protectionRoles as string[])
    : publicProcedure
  )
    .input(
      z.object({
        id: z.string(),
        ...zodModelInput.partial().shape,
      })
    )
    .mutation(async ({ input: { id, ...input } }) => {
      const document = await Model.findById(id);

      if (!document)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Document with id: ${id} not found in model: ${Model.modelName}`,
        });

      Object.assign(document, input);

      await document.save({ validateBeforeSave: false });

      return document as Document;
    });
