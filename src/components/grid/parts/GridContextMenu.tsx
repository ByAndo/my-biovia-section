import { FaSortAmountUp, FaSortAmountDown, FaSort, FaFilePdf, FaFileExcel, FaLayerGroup, FaFilter, FaTimes } from "react-icons/fa";
import { useGridContext } from "../provider/GridContextProvider";
import ContextMenu from "@/components/common/contextmenu/ContextMenu";
import { getTranslation } from "@/language/language.config";
import useLanguage from "@/hook/useLanguage";
import { exportToExcel, exportToPDF } from "../export/GridExport";
import { handleFilter } from "../handlers/GridHandlers";

interface GridContextMenuProps<T> {
  x: number;
  y: number;
  onClose: () => void;
  columnId: string | null;
  data: T[] | null | undefined;
  columns: { id: keyof T; label: string }[] | null | undefined;
  enableSort?: boolean;
  enableExcelExport?: boolean;
  enablePdfExport?: boolean;
  enableGroupBy?: boolean;
  enableFilter?: boolean;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
  sortColumn: keyof T | null;
  sortDirection: "asc" | "desc" | null;
  groupBy: keyof T | null;
  filters: Record<string, string | null>;
}

const GridContextMenu = <T,>({
  x,
  y,
  onClose,
  columnId,
  data,
  columns,
  enableSort = true,
  enableExcelExport = true,
  enablePdfExport = true,
  enableGroupBy = true,
  enableFilter = true,
  setFilters,
  sortColumn,
  sortDirection,
  groupBy,
  filters,
}: GridContextMenuProps<T>) => {
  const language = useLanguage();
  const { handleSort, handleGroupBy } = useGridContext();

  if (!columnId) {
    console.warn(getTranslation(language, "errors", "E00001"));
    return null;
  }

  // ✅ 현재 컬럼 상태 확인
  const isSortedAsc = sortColumn === columnId && sortDirection === "asc";
  const isSortedDesc = sortColumn === columnId && sortDirection === "desc";
  const isNotSorted = sortColumn !== columnId;
  const isGrouped = groupBy === columnId;
  const hasFilter = filters?.[columnId] !== null && filters?.[columnId] !== undefined;

  // ✅ export 함수 래핑 (onClick이 () => void 형태 유지)
  const handleExportExcel = () => {
    if (!data || !columns || data.length === 0 || columns.length === 0) {
      console.error(getTranslation(language, "errors", "E00002"), { data, columns });
      return;
    }
    exportToExcel(data, columns, "ExportedData.xlsx");
  };

  const handleExportPDF = () => {
    if (!data || !columns || data.length === 0 || columns.length === 0) {
      console.error(getTranslation(language, "errors", "E00002"), { data, columns });
      return;
    }
    exportToPDF(data, columns, "ExportedData.pdf");
  };

  return (
    <ContextMenu
      x={x}
      y={y}
      onClose={onClose}
      menuItems={[
        ...(enableSort
          ? [
              { label: getTranslation(language, "word", "sort_asc"), icon: <FaSortAmountUp />, onClick: () => handleSort("asc"), disabled: isSortedAsc },
              { label: getTranslation(language, "word", "sort_desc"), icon: <FaSortAmountDown />, onClick: () => handleSort("desc"), disabled: isSortedDesc },
              { label: getTranslation(language, "word", "sort_clear"), icon: <FaSort />, onClick: () => handleSort(null), disabled: isNotSorted },
              { divider: true },
            ]
          : []),

        ...(enableGroupBy
          ? [
              { label: getTranslation(language, "word", "group_setting"), icon: <FaLayerGroup />, onClick: () => handleGroupBy(columnId), disabled: isGrouped },
              { label: getTranslation(language, "word", "group_clear"), icon: <FaSort />, onClick: () => handleGroupBy(null), disabled: !isGrouped },
              { divider: true },
            ]
          : []),

        ...(enableFilter
          ? [
              {
                label: getTranslation(language, "word", "filter_setting"),
                icon: <FaFilter />,
                onClick: () => {
                  const selectedValue = prompt(`"${columnId}" ${getTranslation(language, "word", "filter")} ${getTranslation(language, "message", "input_values_message")} :`);
                  if (selectedValue !== null) {
                    handleFilter(columnId, selectedValue, setFilters);
                  }
                },
                disabled: hasFilter,
              },
              {
                label: getTranslation(language, "word", "filter_clear"),
                icon: <FaTimes />,
                onClick: () => handleFilter(columnId, null, setFilters),
                disabled: !hasFilter,
              },
              { divider: true },
            ]
          : []),

        ...(enableExcelExport
          ? [{ label: getTranslation(language, "word", "export_excel"), icon: <FaFileExcel className="text-green-600" />, onClick: handleExportExcel }]
          : []),

        ...(enablePdfExport
          ? [{ label: getTranslation(language, "word", "export_pdf"), icon: <FaFilePdf className="text-red-600" />, onClick: handleExportPDF }]
          : []),
      ]}
    />
  );
};

export default GridContextMenu;
