import { z } from 'zod';
export const eventSchema = z.object({ title:z.string().min(3), description:z.string().min(10), category:z.string().min(1), venue:z.string().min(2), city:z.string().min(2), date:z.string().min(1) });
