import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  stock: z.number().int().min(0, 'Stock must be greater than or equal to 0'),
  categoryId: z.string().min(1, 'Category is required'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
});

export const productCategorySchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .transform(val => val.trim()),
  description: z.string()
    .transform(val => val.trim())
    .pipe(z.string().min(0).nullable())
    .optional()
    .catch(null),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductCategoryFormData = z.infer<typeof productCategorySchema>; 