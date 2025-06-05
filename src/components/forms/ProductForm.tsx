'use client';

import { useRouter } from 'next/navigation';
import { Form, FormField, Input, TextArea, Button } from '@/components/ui/Form';
import { productSchema, type ProductFormData } from '@/lib/validations/product';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductFormProps {
  product?: ProductFormData & { id?: string };
  categories: { id: string; name: string }[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/products' + (product?.id ? `/${product.id}` : ''), {
        method: product?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      toast.success(product?.id ? 'Product updated' : 'Product created');
      router.push('/dashboard/products');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      schema={productSchema}
      defaultValues={product}
      onSubmit={handleSubmit}
    >
      {({ register, formState: { errors } }) => (
        <>
          <FormField label="Name" error={errors.name?.message}>
            <Input {...register('name')} />
          </FormField>

          <FormField label="Description" error={errors.description?.message}>
            <TextArea {...register('description')} />
          </FormField>

          <FormField label="Price" error={errors.price?.message}>
            <Input
              type="number"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
            />
          </FormField>

          <FormField label="Stock" error={errors.stock?.message}>
            <Input
              type="number"
              {...register('stock', { valueAsNumber: true })}
            />
          </FormField>

          <FormField label="Category" error={errors.categoryId?.message}>
            <select
              {...register('categoryId')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FormField>

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : product?.id ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
} 