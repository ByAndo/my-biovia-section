import { useMemo, useState, useEffect } from "react";
import {     
    sortGridData, 
    groupGridData, 
    SortDirection, 
    filterGridData
} from "./utility/GridUtility";
import { GridColumnProps } from "./comp/GridColumn";
import GridContextProvider from "./provider/GridContextProvider";
import { handleContextMenu, handleSort, handleGroupBy, toggleGroup, handleRowUpdate, handleRowUndo, handleCellEdit, handleAllUpdate, handleAllUndo } from "./handlers/GridHandlers";
import GridHeader from "./parts/GridHeader";
import GridBody from "./parts/GridBody";
import GridContextMenu from "./parts/GridContextMenu";

/**
 * Grid 컴포넌트의 속성 타입 정의
 */
export type GridProps<T extends Record<string, unknown>> = {
    columns: GridColumnProps<T>[];
    data: T[];
    inCellEditMode? : boolean;
    enableSelectColumn?: boolean;
    enableRowNumColumn?: boolean;
    enableSort?: boolean;
    enableExcelExport?: boolean;
    enablePdfExport?: boolean;
    enableGroupBy?: boolean;
    onDataUpdate?: (updatedData: T[]) => void; // ✅ 부모에게 데이터 변경 알리기
};

/**
 * Grid 컴포넌트
 */
const Grid = <T extends Record<string, unknown>>({
    columns,
    data,
    enableSelectColumn = false,
    enableRowNumColumn = true,
    enableSort = true,
    enableExcelExport = true,
    enablePdfExport = true,
    enableGroupBy = true,
    inCellEditMode = true,
    onDataUpdate, // ✅ 부모에게 데이터 변경 알리는 콜백 추가
    
}: GridProps<T>) => {
    const [gridData, setGridData] = useState<T[]>(data);
    // ✅ 정렬 상태 관리
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    // ✅ 컨텍스트 메뉴 상태 관리
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; columnId: keyof T } | null>(null);

    // ✅ 그룹 상태 관리
    const [groupBy, setGroupBy] = useState<keyof T | null>(null);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    // ✅ 필터 상태
    const [filters, setFilters] = useState<Record<string, string | null>>({});     

    // ✅ 수정된 셀 관리
    const [editedCells, setEditedCells] = useState<Record<number, Record<string, unknown>>>({});

    // ✅ 핸들러에서 직접 columnId를 받도록 설정
    const handlerParams = { setSortColumn, setSortDirection, setContextMenu };
    
    const filteredData = useMemo(() => filterGridData(data, filters), [data, filters]);

    // ✅ 정렬된 데이터 계산
    const sortedData = useMemo(() => sortGridData(filteredData, sortColumn, sortDirection), [filteredData, sortColumn, sortDirection]);

    // ✅ 그룹화된 데이터 계산
    const groupedData = useMemo(() => groupGridData(sortedData, groupBy), [sortedData, groupBy]);    


    // ✅ 그룹 변경 시, 기존 그룹 상태 유지
    useEffect(() => {
        setExpandedGroups((prev) => {
            const newGroups = Object.keys(groupedData).reduce((acc, key) => {
                acc[key] = prev[key] ?? true; // ✅ 기존 값이 있으면 유지, 없으면 true(펼침)
                return acc;
            }, {} as Record<string, boolean>);
            return newGroups;
        });
    }, [groupedData]); 

    return (
        <GridContextProvider
            value={{
                handleSort: (direction) =>
                    contextMenu && handleSort(direction, contextMenu.columnId, handlerParams),
                handleGroupBy: (columnId) => handleGroupBy(columnId, setGroupBy, setExpandedGroups),
            }}
        >
            <div className="relative overflow-x-auto border-[var(--color-second)] border-[0.5px]">
                <table className="w-full border-collapse">
                    {/* ✅ Grid 헤더 생성 */}
                    <GridHeader<T>
                        columns={columns}
                        enableSelectColumn={enableSelectColumn}
                        enableRowNumColumn={enableRowNumColumn}
                        onContextMenu={(event, columnId) => handleContextMenu(event, columnId, setContextMenu)}
                        groupBy={groupBy}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        filters={filters}
                        setFilters={setFilters} 
                        editedCells={editedCells} 
                        onBulkUpdate={()=>handleAllUpdate(gridData, setGridData, editedCells, setEditedCells, onDataUpdate)} 
                        onBulkUndo={()=>handleAllUndo(editedCells, setEditedCells)}   
                    />

                    {/* ✅ Grid 본문 생성 */}
                    <GridBody<T>
                        columns={columns}
                        data={groupBy ? groupedData : { "allData": sortedData }}
                        enableSelectColumn={enableSelectColumn}
                        enableRowNumColumn={enableRowNumColumn}
                        groupBy={groupBy}
                        expandedGroups={expandedGroups}
                        toggleGroup={(groupKey) => toggleGroup(groupKey, setExpandedGroups)}
                        inCellEditMode={inCellEditMode} // ✅ 전달
                        editedCells={editedCells} // ✅ 전달
                        onCellEdit={(rowIndex: number, columnId: string, newValue: unknown)=>handleCellEdit(rowIndex, columnId, newValue, setEditedCells)} // ✅ 전달                        
                        onRowUpdate={(rownindex)=>handleRowUpdate(rownindex as number, gridData, setGridData, editedCells, setEditedCells, onDataUpdate)} 
                        onRowUndo={(rowIndex) => handleRowUndo(rowIndex as number, editedCells, setEditedCells)}  
                    />                    
                </table>

                {/* ✅ 컨텍스트 메뉴 */}
                {contextMenu && (
                    <GridContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={() => setContextMenu(null)}
                        columnId={String(contextMenu.columnId)}
                        data={sortedData} // ✅ data 명확히 전달
                        columns={columns.map(col => ({ id: col.id, label: col.label }))}
                        enableSort={enableSort}
                        enableExcelExport={enableExcelExport}
                        enablePdfExport={enablePdfExport}
                        enableGroupBy={enableGroupBy}
                        setFilters={setFilters} 
                        sortColumn={sortColumn} 
                        sortDirection={sortDirection} 
                        groupBy={groupBy} 
                        filters={filters}                    />
                )}
            </div>
        </GridContextProvider>
    );
};

export default Grid;
