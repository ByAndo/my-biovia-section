import Button from "@/components/common/buttons/Button";
import React from "react";
import { FaUndo, FaCheck } from "react-icons/fa";

interface GridTwoButtonCellProps {
  rowIndex?: number; // ✅ 현재 행 번호  
  onUndoClick: (rowIndex?: number) => void; // ✅ 되돌리기 핸들러
  onUpdateClick: (rowIndex?: number) => void; // ✅ 적용 핸들러
}

const GridTwoButtonCell: React.FC<GridTwoButtonCellProps> = ({
  rowIndex,
  onUndoClick,
  onUpdateClick,
}) => {
  return (
    <td className="w-5 px-2 py-1 text-center">      
        <div className="flex items-center justify-center gap-1">
          {/* ✅ 되돌리기 버튼 */}
          <Button
            icon={<FaUndo />}
            onClick={() => onUndoClick(rowIndex)}   
            background="var(--color-fourth)"         
            hoverBgColor="var(--color-fourth-hover)"
            fontColor = "var(--color-prime)"
          />

          {/* ✅ 적용 버튼 */}
          <Button
            icon={<FaCheck />}
            onClick={() => onUpdateClick(rowIndex)}                        
            background="var(--color-fourth)"         
            hoverBgColor="var(--color-fourth-hover)"
            fontColor = "var(--color-prime)"
          />
        </div>
    </td>
  );
};

export default GridTwoButtonCell;
