import { prisma } from "@/lib/prisma";
import { ProductCategory } from "@prisma/client";

export const dynamic = "force-dynamic";

async function getCategories() {
  try {
    const categories = await prisma.productCategory.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>
      </div>
      <div className="grid gap-4">
        {categories.map((category: ProductCategory) => (
          <div key={category.id} className="p-4 border rounded-lg">
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-gray-500">
              {category.description || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
