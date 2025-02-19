import React from "react";
import { FaSortUp, FaSortDown, FaLayerGroup, FaFilter, FaTimes } from "react-icons/fa";
import { GridColumnProps } from "../comp/GridColumn";
import GridTwoButtonCell from "../comp/GridTwoCellButton";

interface GridHeaderProps<T> {
    columns: GridColumnProps<T>[] | undefined;
    enableSelectColumn: boolean;
    enableRowNumColumn: boolean;
    sortColumn: keyof T | null;
    sortDirection: "asc" | "desc" | null;
    groupBy: keyof T | null;
    filters: Record<string, string | null>;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
    editedCells: Record<number, Record<string, unknown>>; // ✅ 추가: 수정된 셀 상태
    onBulkUpdate: () => void; // ✅ 일괄 적용 핸들러 추가
    onBulkUndo: () => void; // ✅ 일괄 되돌리기 핸들러 추가    
    onContextMenu: (event: React.MouseEvent, columnId: keyof T) => void;
}

const GridHeader = <T,>({
    columns = [],
    enableSelectColumn,
    enableRowNumColumn,
    sortColumn,
    sortDirection,
    groupBy,
    filters,
    setFilters,
    editedCells, // ✅ 추가
    onBulkUpdate, // ✅ 추가
    onBulkUndo, // ✅ 추가    
    onContextMenu,
}: GridHeaderProps<T>) => {        
    const hasEditedCells = Object.keys(editedCells).length > 0;
    const handleFilterInputChange = (columnId: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [columnId]: value || null, // 값이 없으면 필터 제거
        }));
    };

    return (
        <thead>
            {/* ✅ 컬럼 헤더 */}
            <tr className="bg-[var(--color-second)] text-[var(--color-font)] border-b-[2px] border-[var(--color-font)]">
                {hasEditedCells && (                    
                    <GridTwoButtonCell                        
                        onUndoClick={onBulkUndo}
                        onUpdateClick={onBulkUpdate}                        
                    />                    
                )}                
                {enableSelectColumn && <th className="w-10 px-2 py-1 text-center"><input type="checkbox" className="form-checkbox" /></th>}
                {enableRowNumColumn && <th className="w-10 px-2 py-1 text-center">No.</th>}

                {columns.map((col) => {
                const colKey = String(col.id);
                const isFiltered = filters[colKey] !== null && filters[colKey] !== undefined;

                return (
                    <th
                        key={colKey}
                        onContextMenu={(event) => col.sortable && onContextMenu(event, col.id)}
                        className="px-2 py-1 border-[var(--color-second)] text-[13px] select-none cursor-pointer"
                        style={{ textAlign: col.align || "left", width: col.width || "auto" }}
                    >
                            <div className="flex items-center space-x-2" style={{ justifyContent: col.align || "left" }}>
                                <span>{col.label}</span>

                                {/* ✅ 정렬 아이콘 */}
                                {col.sortable && sortColumn === col.id && (
                                sortDirection === "asc" ? <FaSortUp className="text-blue-500 text-lg" /> : <FaSortDown className="text-blue-500 text-lg" />
                                )}

                                {/* ✅ 그룹핑 아이콘 */}
                                {groupBy === col.id && <FaLayerGroup className="text-green-500 text-sm" />}

                                {/* ✅ 필터 아이콘 */}
                                {isFiltered && <FaFilter className="text-blue-500 text-sm" />}
                            </div>
                    </th>
                );
                })}
            </tr>

            {/* ✅ 필터 입력 행 (필터가 하나라도 있을 때만 표시) */}
            {Object.values(filters).some((value) => value !== null) && (
                <tr className="bg-[var(--color-prime-hover)]">
                    {enableSelectColumn && <th className="w-10"></th>}
                    {enableRowNumColumn && <th className="w-10"></th>}

                    {columns.map((col) => {
                        const colKey = String(col.id);
                        const filterValue = filters[colKey] || ""; // 현재 입력 중인 값 

                        return (
                            <th key={`${colKey}-filter`} className="px-2 py-1 border-[var(--color-second)] text-[13px]">
                                {/* ✅ 필터가 설정된 컬럼만 필터 입력 필드 표시 */}
                                {filters[colKey] !== undefined && filters[colKey] !== null && (
                                <div className="flex items-center space-x-2">
                                    <input className="w-full h-6 px-2 py-1 text-[13px] border-[0.5px] border-[var(--color-second)] rounded bg-[var(--color-prime)] focus:outline-none focus:ring-1 focus:ring-[var(--color-second-hover)]"                                    
                                        type="text"
                                        value={filterValue} // ✅ 필터 값 유지                                    
                                        onChange={(e) => handleFilterInputChange(colKey, e.target.value)}                                                      
                                    />
                                    {/* ✅ 필터 해제 버튼 */}
                                    <button className="text-[var(--color-error)] hover:text-[var(--color-error-dark)]"
                                        onClick={() => setFilters((prev) => {
                                            const updatedFilters = { ...prev };
                                            delete updatedFilters[colKey];
                                            return updatedFilters;
                                    })}
                                    
                                    >
                                    <FaTimes />
                                    </button>
                                </div>
                                )}
                            </th>

                        );
                    })}
                </tr>
            )}
        </thead>
    );
};

export default GridHeader;
