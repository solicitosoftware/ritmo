import { ProductForm } from '@/components/forms/ProductForm';
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

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) notFound();
  return product;
}

async function getCategories() {
  return prisma.productCategory.findMany();
}

export default async function ProductFormPage({ params, searchParams }: Props) {
  const isEditing = params.action === 'edit';
  const product = isEditing && searchParams.id ? await getProduct(searchParams.id) : null;
  const categories = await getCategories();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-8">
        {isEditing ? 'Edit Product' : 'Create Product'}
      </h1>
      <ProductForm product={product} categories={categories} />
    </div>
  );
} 