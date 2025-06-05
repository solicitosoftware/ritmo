'use client';

import { useRouter } from 'next/navigation';
import { Form, FormField, Input, TextArea, Button } from '@/components/ui/Form';
import { productCategorySchema, type ProductCategoryFormData } from '@/lib/validations/product';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface CategoryFormProps {
  category?: ProductCategoryFormData & { id?: string };
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const form = useForm({
    resolver: zodResolver(productCategorySchema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof productCategorySchema>) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/categories' + (category?.id ? `/${category.id}` : ''), {
        method: category?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      toast.success(category?.id ? 'Category updated' : 'Category created');
      router.push('/dashboard/categories');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <FormField label="Name" error={form.formState.errors.name?.message}>
        <Input
          id="name"
          {...form.register('name')}
          disabled={isSubmitting}
          placeholder="Enter category name"
        />
      </FormField>

      <FormField label="Description" error={form.formState.errors.description?.message}>
        <TextArea
          id="description"
          {...form.register('description')}
          disabled={isSubmitting}
          placeholder="Enter category description"
        />
      </FormField>

      <div className="mt-6 flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || form.formState.isSubmitting}
        >
          {isSubmitting ? 'Saving...' : category?.id ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
} 