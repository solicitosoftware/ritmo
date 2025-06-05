import { CategoryForm } from '@/components/forms/CategoryForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    action: string;
  };
  searchParams: {
    id?: string;
  };
}

async function getCategory(id: string) {
  const category = await prisma.productCategory.findUnique({
    where: { id },
  });
  if (!category) notFound();
  return category;
}

export default async function CategoryFormPage({ params, searchParams }: Props) {
  const isEditing = params.action === 'edit';
  const category = isEditing && searchParams.id ? await getCategory(searchParams.id) : null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-8">
        {isEditing ? 'Edit Category' : 'Create Category'}
      </h1>
      <CategoryForm category={category} />
    </div>
  );
} 