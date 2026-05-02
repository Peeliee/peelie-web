import { z } from 'zod';

export const MetaPayloadSchema = z.object({
  chatRoomPublicId: z.string(),
  userPublicId: z.string(),
  friendPublicId: z.string(),
});

export const DeltaPayloadSchema = z.object({
  content: z.string(),
});

export const DonePayloadSchema = z.object({
  chatRoomPublicId: z.string(),
  answer: z.string(),
});

export const ErrorPayloadSchema = z.object({
  message: z.string(),
});
