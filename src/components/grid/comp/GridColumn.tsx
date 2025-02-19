export type GridColumnProps<T> = {
  id: keyof T extends string | number | symbol ? keyof T : never;
  label: string;
  type: "text" | "number" | "date" | "custom";
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  visible?: boolean;
  customRender?: (value: T[keyof T]) => React.ReactNode;
};

const GridColumn = <T,>({ id, label, width, align, sortable }: GridColumnProps<T>) => {
  return (
    <th
      key={String(id)}
      className="px-2 py-1 border-[var(--color-second)] border-[0.3px] font-semibold uppercase select-none"
      style={{ textAlign: align || "left", width: width || "auto" }}
    >
      {label}
      {sortable && <span className="ml-2 text-gray-400">▲</span>}
    </th>
  );
};

export default GridColumn;
