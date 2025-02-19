import { Dispatch, SetStateAction } from "react";
import { SortDirection } from "../utility/GridUtility";
import { getTranslation } from "@/language/language.config";
import { store } from "@/redux/store"; // ✅ Redux Store 불러오기
import { RootState } from "@/redux/store"; // ✅ RootState 타입 가져오기

/**
 * Grid 핸들러 상태 관리 타입
 */
interface GridHandlerParams<T> {
  setSortColumn: Dispatch<SetStateAction<keyof T | null>>;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  setContextMenu: Dispatch<SetStateAction<{ x: number; y: number; columnId: keyof T } | null>>;  
}

const getReduxState = (): RootState => {
    return store.getState(); // Redux Store의 현재 상태 반환
};


/**
 * 📌 컨텍스트 메뉴 호출 (우클릭)
 */
export const handleContextMenu = <T>(
  event: React.MouseEvent,
  columnId: keyof T,
  setContextMenu: Dispatch<SetStateAction<{ x: number; y: number; columnId: keyof T } | null>>
) => {
  event.preventDefault();
  setContextMenu({ x: event.clientX, y: event.clientY, columnId });
};

/**
 * 📌 정렬 실행
 */
export const handleSort = <T>(
  direction: SortDirection,
  columnId: keyof T,
  params: GridHandlerParams<T>
) => {
  const { setSortColumn, setSortDirection, setContextMenu } = params;
  setSortColumn(direction !== null ? columnId : null);
  setSortDirection(direction);
  setContextMenu(null);
};

/**
 * 📌 컬럼을 그룹핑하거나 그룹 해제
 */
export const handleGroupBy = <T>(
  columnId: keyof T | null,
  setGroupBy: Dispatch<SetStateAction<keyof T | null>>,
  setExpandedGroups: Dispatch<SetStateAction<Record<string, boolean>>>
) => {
  setGroupBy(columnId);
  if (!columnId) {
    setExpandedGroups(() => ({})); // ✅ 그룹 해제 시 확장 상태 초기화
  }
};

/**
 * 📌 그룹 확장/축소 토글
 */
export const toggleGroup = (
  groupKey: string,
  setExpandedGroups: Dispatch<SetStateAction<Record<string, boolean>>>
) => {
  setExpandedGroups((prev) => ({
    ...prev,
    [groupKey]: !prev[groupKey],
  }));
};

/**
 * Grid 필터 적용 함수
 * @param columnId 필터를 적용할 컬럼 ID
 * @param value 필터 값 (null이면 필터 해제)
 * @param setFilters 필터 상태 변경 함수
 */
export const handleFilter = (
    columnId: string,
    value: string | null,
    setFilters: Dispatch<SetStateAction<Record<string, string | null>>>
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value, // ✅ 필터 값 설정 (값이 null이면 필터 해제)
    }));
};
/**
 * ✅ 셀 값 수정 핸들러
 * @param rowIndex - 수정할 행 인덱스
 * @param columnId - 수정할 컬럼 ID
 * @param newValue - 새로운 값
 * @param setEditedCells - 수정된 셀 상태 업데이트 함수
 */
export const handleCellEdit = (
    rowIndex: number,
    columnId: string,
    newValue: unknown,
    setEditedCells: Dispatch<SetStateAction<Record<number, Record<string, unknown>>>>
) => {
    setEditedCells((prev) => ({
        ...prev,
        [rowIndex]: { ...prev[rowIndex], [columnId]: newValue },
    }));
};
/**
 * 개별 행 수정 적용 핸들러
 * @param rowIndex 수정할 행의 인덱스
 * @param gridData 현재 Grid 데이터
 * @param setGridData Grid 데이터 업데이트 함수
 * @param editedCells 수정된 셀 정보
 * @param setEditedCells 수정된 셀 상태 업데이트 함수
 * @param onDataUpdate 부모 컴포넌트에 데이터 변경 알림 (선택적)
 */
export const handleRowUpdate = <T>(
    rowIndex: number | null,
    gridData: T[],
    setGridData: Dispatch<SetStateAction<T[]>>,
    editedCells: Record<number, Record<string, unknown>>,
    setEditedCells: Dispatch<SetStateAction<Record<number, Record<string, unknown>>>>,
    onDataUpdate?: (updatedData: T[]) => void
    ) => {
        if (rowIndex === null || !editedCells[rowIndex]) return;
    
        // 🔥 기존 데이터 업데이트
        const updatedData = gridData.map((row, index) =>
        index === rowIndex
            ? { ...row, ...editedCells[rowIndex] } // ✅ 수정된 데이터 반영
            : row
        );
    
        setGridData(updatedData); // ✅ 내부 상태 업데이트
        onDataUpdate?.(updatedData); // ✅ 부모 컴포넌트에도 업데이트 전달
    
        // ✅ 수정된 셀 목록에서 해당 rowIndex 제거 (완료 후 초기화)
        setEditedCells((prev) => {
        const updated = { ...prev };
        delete updated[rowIndex];
        return updated;
        });
};

/**
 * ✅ 개별 행 되돌리기 핸들러
 */
export const handleRowUndo = (
    rowIndex: number,
    editedCells: Record<number, Record<string, unknown>>,
    setEditedCells: Dispatch<SetStateAction<Record<number, Record<string, unknown>>>>
) => {
    if (rowIndex === null || !editedCells[rowIndex]) return;    

    // ✅ 수정된 데이터 삭제 (되돌리기)
    setEditedCells((prev) => {
        const updated = { ...prev };
        delete updated[rowIndex];
        return updated;
    });
};

/**
 * ✅ 모든 변경 사항을 적용하는 핸들러
 * @param editedCells - 수정된 셀 데이터 객체
 * @param setEditedCells - 수정된 셀 상태 업데이트 함수
 */
export const handleAllUpdate = <T>(    
    gridData: T[],
    setGridData: Dispatch<SetStateAction<T[]>>,
    editedCells: Record<number, Record<string, unknown>>,
    setEditedCells: Dispatch<SetStateAction<Record<number, Record<string, unknown>>>>,
    onDataUpdate?: (updatedData: T[]) => void
) => {
    const lang = getReduxState().language.language;
    if (Object.keys(editedCells).length === 0) return;
    if (!window.confirm(getTranslation(lang, "message", "all_update_message"))) return; 

    const updatedData = gridData.map((row, index) =>
        editedCells[index] !== undefined
            ? { ...row, ...editedCells[index] } // ✅ 수정된 데이터 반영
            : row
    );
    
    setGridData(updatedData); // ✅ 내부 상태 업데이트
    onDataUpdate?.(updatedData); // ✅ 부모 컴포넌트에도 업데이트 전달
    
    // ✅ 수정된 셀 목록에서 해당 rowIndex 제거 (완료 후 초기화)
    setEditedCells((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
            delete updated[Number(key)];
          });
        return updated;
    });
};

/**
 * ✅ 모든 변경 사항을 되돌리는 핸들러
 * @param editedCells - 수정된 셀 데이터 객체
 * @param setEditedCells - 수정된 셀 상태 업데이트 함수
 */
export const handleAllUndo = (        
    editedCells: Record<number, Record<string, unknown>>,
    setEditedCells: React.Dispatch<React.SetStateAction<Record<number, Record<string, unknown>>>>
) => {
    const lang = getReduxState().language.language;
    if (Object.keys(editedCells).length === 0) return;
    if (!window.confirm(getTranslation(lang, "message", "all_undo_message"))) return;
    
    setEditedCells({});
};



