import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Form';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  const columns = [
    {
      header: 'Name',
      accessor: 'name' as const,
    },
    {
      header: 'Category',
      accessor: 'category' as const,
      render: (product: any) => product.category.name,
    },
    {
      header: 'Price',
      accessor: 'price' as const,
      render: (product: any) => `$${product.price.toFixed(2)}`,
    },
    {
      header: 'Stock',
      accessor: 'stock' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/dashboard/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>
      <DataTable
        data={products}
        columns={columns}
      />
    </div>
  );
} 