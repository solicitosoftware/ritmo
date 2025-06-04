'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CategoryActionsProps {
  category: {
    id: string;
    name: string;
  };
}

export function CategoryActions({ category }: CategoryActionsProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/dashboard/categories/edit?id=${category.id}`);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${category.name}"?`)) return;

    try {
      const response = await fetch(`/api/categories?id=${category.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete category');
      }

      toast.success('Category deleted successfully');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete category');
    }
  };

  return (
    <div className="space-x-3">
      <button
        onClick={handleEdit}
        className="text-secondary hover:text-secondary/90 font-medium transition-colors"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="text-error hover:text-error/90 font-medium transition-colors"
      >
        Delete
      </button>
    </div>
  );
} 