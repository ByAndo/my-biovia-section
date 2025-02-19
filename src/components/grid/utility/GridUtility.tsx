export type SortDirection = "asc" | "desc" | null;

/**
 * Grid 데이터 정렬 함수
 * @param data 원본 데이터 배열
 * @param sortColumn 정렬할 컬럼
 * @param sortDirection 정렬 방향 ("asc" | "desc" | null)
 * @returns 정렬된 데이터 배열
 */
export const sortGridData = <T extends Record<string, unknown>>(
    data: T[],
    sortColumn: keyof T | null,
    sortDirection: SortDirection
): T[] => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      // ✅ 날짜 형식 정렬 (createdAt 컬럼)
      if (sortColumn === "createdAt") {
        const dateA = new Date(valueA as string).getTime();
        const dateB = new Date(valueB as string).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }

      // ✅ 숫자 형식 정렬
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      // ✅ 문자열 형식 정렬
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });
};

/**
 * Grid 데이터를 그룹으로 묶는 함수
 * @param data 원본 데이터
 * @param groupBy 그룹핑할 컬럼 ID
 * @returns 그룹화된 데이터 (객체 형태)
 */
export const groupGridData = <T,>(data: T[], groupBy: keyof T | null): Record<string, T[]> => {
    if (!groupBy) return { "전체 데이터": data }; // ✅ 그룹 설정이 없으면 기본 데이터 반환
    //console.log("📌 groupGridData로 넘어온 데이터:", data);

    const grouped = data.reduce((groups, row) => {
        const key = row[groupBy] as string | number; // ✅ 그룹 키를 문자열 또는 숫자로 변환
        if (!key) return groups; // ✅ key가 없는 경우 그룹화 안 함

        if (!groups[key]) groups[key] = []; // ✅ 그룹이 없으면 새로 생성
        groups[key].push(row); // ✅ 그룹에 데이터 추가
        return groups;
    }, {} as Record<string, T[]>);

    return Object.keys(grouped).length > 0 ? grouped : { "전체 데이터": data }; // ✅ 빈 그룹 방지
};


/**
 * ✅ Grid 데이터 필터링 함수
 * @param data - 원본 데이터 배열
 * @param filters - 적용할 필터 객체
 * @returns 필터링된 데이터 배열
 */
export const filterGridData = <T extends Record<string, unknown>>( 
    data: T[],
    filters: Record<string, string | null>
): T[] => {
    return data.filter((row) => {
        return Object.entries(filters).every(([column, value]) => {
            if (!value) return true;
            return String(row[column as keyof T]).includes(value); 
        });
    });
};

