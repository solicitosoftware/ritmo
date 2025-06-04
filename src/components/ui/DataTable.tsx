import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T>({ data, columns, onEdit, onDelete }: DataTableProps<T>) {
  return (
    <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.accessor)}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider font-inter"
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-muted transition-colors">
                {columns.map((column) => (
                  <td
                    key={String(column.accessor)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-text-base font-inter"
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.accessor])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-secondary hover:text-secondary/90 font-medium transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="text-error hover:text-error/90 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 