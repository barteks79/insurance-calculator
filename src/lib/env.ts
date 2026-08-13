import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DB_HOST: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().optional(),
    DB_DATABASE: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string().min(1)
  },
  runtimeEnv: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
  }
});
