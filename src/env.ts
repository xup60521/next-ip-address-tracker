import { z } from "zod";

const envSchema = z.object({
    IPIFY_API_KEY: z.string(),
});

export const env = envSchema.parse({
    IPIFY_API_KEY: process.env.IPIFY_API_KEY,
});
