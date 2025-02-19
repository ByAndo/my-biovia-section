import React, { useState } from "react";
import { GridColumnProps } from "../comp/GridColumn";
import GridTwoButtonCell from "../comp/GridTwoCellButton";
import { BiSolidRightArrow, BiSolidDownArrow  } from "react-icons/bi";

interface GridBodyProps<T> {
    columns: GridColumnProps<T>[];
    data: Record<string, T[]>; // ✅ 항상 그룹핑된 형태의 객체로 전달
    enableSelectColumn: boolean;
    enableRowNumColumn: boolean;
    groupBy: keyof T | null;
    expandedGroups: Record<string, boolean>;
    toggleGroup: (groupKey: string) => void;
    inCellEditMode?: boolean; // ✅ 추가
    editedCells: Record<number, Record<string, unknown>>; // ✅ 수정된 셀 상태
    onCellEdit: (rowIndex: number, columnId: string, newValue: unknown) => void; // ✅ 수정 핸들러  
    onRowUpdate: (rowIndex?: number) => void; // ✅ 추가: 개별 적용 핸들러  
    onRowUndo: (rowIndex?: number) => void; // ✅ 추가: 개별 되돌리기 핸들러     

}

const GridBody = <T extends Record<string, unknown>>({
    columns,
    data,
    enableSelectColumn,
    enableRowNumColumn,
    groupBy,
    expandedGroups,
    toggleGroup,
    inCellEditMode = false, // ✅ 기본값 비활성화
    editedCells,
    onCellEdit,    
    onRowUpdate, // ✅ 추가
    onRowUndo, // ✅ 추가    
}: GridBodyProps<T>): React.ReactElement => {
    // ✅ `data`가 배열이 아니라 객체 형태인지 확인
    const groupedData: Record<string, T[]> = Array.isArray(data) ? { "allData": data } : data;

    // ✅ 현재 편집 중인 셀 상태
    const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null);
    const [inputValue, setInputValue] = useState<string>("");

    // ✅ 셀 더블 클릭 시 편집 모드 활성화
    const handleDoubleClick = (rowIndex: number, columnId: string, value: unknown) => {
        if (!inCellEditMode) return; // ✅ 편집 모드가 아닐 경우 무시
        setEditingCell({ rowIndex, columnId });
        setInputValue(String(value));
    };

    // ✅ 엔터 → 저장, ESC → 취소
    const handleKeyDown = (e: React.KeyboardEvent, rowIndex: number, columnId: string) => {
        if (e.key === "Enter") {
            onCellEdit(rowIndex, columnId, inputValue);
            setEditingCell(null);
        } else if (e.key === "Escape") {
            setEditingCell(null);
        }
    };

    return (
        <tbody>
            {Object.entries(groupedData).map(([groupKey, rows]) => {
                const typedRows: T[] = Array.isArray(rows) ? rows : [];

                return (
                    <React.Fragment key={groupKey}>
                        {/* ✅ 그룹 헤더 */}
                        {groupBy && (
                            <tr className="bg-[var(--color-second-hover)] cursor-pointer" onClick={() => toggleGroup(groupKey)}>
                                <td colSpan={columns.length + (enableSelectColumn ? 1 : 0) + (enableRowNumColumn ? 1 : 0)}>
                                    <span className="inline-flex items-center">
                                        {expandedGroups[groupKey] ? (
                                            <BiSolidDownArrow  className="text-[var(--color-fourth-hover)] text-sm mr-1" />
                                        ) : (
                                            <BiSolidRightArrow className="text-[var(--color-font)] text-sm mr-1" />
                                        )}
                                        {groupKey} ({typedRows.length})
                                    </span>
                                </td>
                            </tr>
                        )}

                        {/* ✅ 데이터 표시 */}
                        {(!groupBy || expandedGroups[groupKey]) &&
                            typedRows.map((row, rowIndex) => { 
                                const isEdited = editedCells[rowIndex] !== undefined;
                                return (                                

                                            <tr key={rowIndex} className={`border-[var(--color-second)] border-[0.3px] transition duration-200 ${
                                                rowIndex % 2 === 0 ? "bg-[var(--color-prime)]" : "bg-[var(--color-prime-hover)]"
                                            } hover:bg-[var(--color-second-hover)]`}>     
                                                {/* ✅ 개별 적용 & 되돌리기 버튼 (수정된 경우에만 표시) */}
                                                                                           
                                                {isEdited === true ? (                                                    
                                                        <GridTwoButtonCell
                                                            rowIndex={rowIndex}
                                                            onUndoClick={onRowUndo}
                                                            onUpdateClick={onRowUpdate}
                                                        />
                                                    ): Object.keys(editedCells).length > 0 && (<td></td>)}
                                                
                                                
                                                {/* ✅ 체크박스 컬럼 */}
                                                {enableSelectColumn && (
                                                    <td className="px-2 py-1 border-[var(--color-second)] text-center">
                                                        <input type="checkbox" className="form-checkbox" />
                                                    </td>
                                                )}

                                                {/* ✅ RowNum 컬럼 */}
                                                {enableRowNumColumn && (
                                                    <td className="px-2 py-1 border-[var(--color-second)] text-center">
                                                        {rowIndex + 1}
                                                    </td>
                                                )}

                                                {/* ✅ 데이터 컬럼 */}
                                                {columns.map((col) => {
                                                    const colKey = String(col.id);
                                                    const isEditing = editingCell?.rowIndex === rowIndex && editingCell.columnId === colKey;
                                                    const editedValue = editedCells[rowIndex]?.[colKey] ?? row[colKey];
                                                    const isEdited = editedCells[rowIndex]?.[colKey] !== undefined;

                                                    return (
                                                        <td 
                                                            key={colKey}
                                                            className={`px-2 py-1 border-[var(--color-second)] text-[13px] cursor-pointer 
                                                                ${isEdited ? "text-[var(--color-font-edited)] font-bold" : ""}`} // ✅ 수정된 셀 강조
                                                            onDoubleClick={() => handleDoubleClick(rowIndex, colKey, row[colKey])}
                                                        >
                                                            
                                                            {/* ✅ 편집 모드 */}
                                                            {isEditing ? (
                                                                <input className="w-full h-6 px-2 py-1 text-[13px] border-[0.5px] border-[var(--color-second)] rounded bg-[var(--color-prime)] focus:outline-none focus:ring-1 focus:ring-[var(--color-second-hover)]"
                                                                    type="text"
                                                                    value={inputValue}
                                                                    onChange={(e) => setInputValue(e.target.value)}
                                                                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colKey)}
                                                                    onBlur={() => setEditingCell(null)} // 포커스 해제 시 취소                                                                                                                
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                col.customRender 
                                                                    ? col.customRender(editedValue as T[keyof T]) // ✅ `editedValue` 적용
                                                                    : String(editedValue) // ✅ 수정된 값 적용
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        )
                            })}
                    </React.Fragment>
                );
            })}
        </tbody>
    );
};

export default GridBody;
