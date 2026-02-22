import { z } from 'zod';
import { predictionResponseSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  predictFull: {
    method: 'POST' as const,
    path: '/api/predict/full' as const,
    responses: {
      200: predictionResponseSchema,
    },
  },
  predictCxr: {
    method: 'POST' as const,
    path: '/api/predict/cxr' as const,
    responses: {
      200: predictionResponseSchema,
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
