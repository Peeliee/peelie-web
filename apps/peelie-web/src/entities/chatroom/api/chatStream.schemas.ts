import { z } from 'zod';

export const MetaPayloadSchema = z.object({
  chatRoomId: z.string(),
  friendId: z.string(),
  userId: z.string(),
});

export const BubblePayloadSchema = z.object({
  text: z.string(),
  delayMs: z.number(),
});

export const SuggestionsPayloadSchema = z.array(z.string());

export const DonePayloadSchema = z.object({
  chatRoomId: z.string(),
});

export const SkipPayloadSchema = z.object({}).passthrough();

export const ErrorPayloadSchema = z.object({
  message: z.string(),
});
