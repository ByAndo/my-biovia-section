import React from 'react';

interface Column<T extends object> {
  key: keyof T & string;
  title: string;
}

interface DataTableProps<T extends object> {
  columns: Array<Column<T>>;
  data: T[];
}

// ▼ 여기서 T를 "Record<string, React.ReactNode>"를 상속받도록 제한
function DataTable<T extends Record<string, React.ReactNode>>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="p-2 border border-gray-300 text-left"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border border-gray-300">
              {columns.map((col) => (
                <td key={String(col.key)} className="p-2 border border-gray-300">
                  {row[col.key]}                  
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
