import { z } from 'zod';

export const itemSchema = z.object({
  id: z.uuid(),
  createdAt: z.date(),
  itemName: z.string(),
  itemDescription: z.string(),
  quantity: z.number().int().positive(),
  value: z.number().positive(),
  itemAddress: z.string(),
  itemImages: z.array(z.string()).nonempty(), // As URLs das imagens após o upload
});

export type Item = z.infer<typeof itemSchema>;

export const itemSchemaWithFiles = itemSchema.omit({ itemImages: true }).extend({
  itemImages: z.array(z.instanceof(File)).optional(),
});

export type ItemWithFiles = z.infer<typeof itemSchemaWithFiles>;