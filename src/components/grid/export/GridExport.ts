import * as XLSX from "xlsx"; // ✅ Excel 변환을 위한 xlsx 라이브러리
import jsPDF from "jspdf"; // ✅ PDF 변환을 위한 jsPDF 라이브러리
import autoTable from "jspdf-autotable"; // ✅ 올바르게 import

/**
 * 📌 Excel 내보내기 함수
 * @param data 내보낼 데이터 배열
 * @param columns 컬럼 정의
 * @param fileName 저장할 파일 이름 (기본값: "export.xlsx")
 */
export const exportToExcel = <T>(
    data: T[] | null | undefined,
    columns: { id: keyof T; label: string }[] | null | undefined,
    fileName: string = "export.xlsx"
  ) => {
    if (!data || !columns || data.length === 0 || columns.length === 0) {
      console.error("🚨 데이터 또는 컬럼이 비어있거나 undefined 상태입니다.");
      return;
    }
  
    const tableColumn = columns.map(col => col.label);
    const tableRows = data.map(row =>
      columns.map(col => row[col.id] !== undefined ? row[col.id] : "")
    );
  
    const ws = XLSX.utils.aoa_to_sheet([tableColumn, ...tableRows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  };
/**
 * 📌 PDF 내보내기 함수
 * @param data 내보낼 데이터 배열
 * @param columns 컬럼 정의
 * @param fileName 저장할 파일 이름 (기본값: "export.pdf")
 */
export const exportToPDF = <T>(
    data: T[], 
    columns: { id: keyof T; label: string }[], 
    fileName: string = "export.pdf"
  ) => {
    const doc = new jsPDF();
    const tableColumn = columns.map(col => col.label);
    const tableRows = data.map(row => columns.map(col => row[col.id] || ""));
  
    autoTable(doc, { head: [tableColumn], body: tableRows }); // ✅ autoTable 명시적 사용
  
    doc.save(fileName);
  };