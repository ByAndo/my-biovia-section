import { createContext, useContext } from "react";

interface GridContextProps {
  handleSort: (direction: "asc" | "desc" | null) => void; //✅ Sort 기능 추가
  handleGroupBy: (columnId: string | null) => void; // ✅ 그룹 기능 추가
  handleExport?: (format: "excel" | "pdf") => void; // 🔥 엑셀/PDF 내보내기 추가 가능
}

const GridContextProvider = createContext<GridContextProps | null>(null);

/**
 * Grid Context를 사용하기 위한 커스텀 훅
 */
export const useGridContext = () => {
  const context = useContext(GridContextProvider);
  if (!context) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
};

export default GridContextProvider.Provider;
