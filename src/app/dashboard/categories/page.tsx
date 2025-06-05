import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Form';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getCategories() {
  try {
    const categories = await prisma.productCategory.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  const columns = [
    {
      header: 'Name',
      accessor: 'name' as const,
    },
    {
      header: 'Description',
      accessor: 'description' as const,
      render: (category: any) => category.description || '-',
    },
    {
      header: 'Products',
      accessor: '_count' as const,
      render: (category: any) => category._count.products,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Link href="/dashboard/categories/new">
          <Button>Add Category</Button>
        </Link>
      </div>
      <DataTable
        data={categories}
        columns={columns}
      />
    </div>
  );
} 