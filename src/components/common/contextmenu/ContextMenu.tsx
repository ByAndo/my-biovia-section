import React, { useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";

export interface ContextMenuItem {
  label?: string;
  icon?: string | ReactNode; // ✅ 아이콘 추가 (string, ReactIcon, 일반 ReactNode)
  onClick?: () => void;
  divider?: boolean;
  disabled?: boolean; // ✅ 비활성화 속성 추가
}

interface ContextMenuProps {
  x: number;
  y: number;
  menuItems: ContextMenuItem[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, menuItems, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const menuElement = (
    <div
      ref={menuRef}
      className="fixed z-[9999] w-48 border rounded-md border-[var(--color-second)] shadow-lg bg-[var(--color-prime)] text-[var(--color-font)]"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transform: "translate(0, 5px)",
      }}
    >
      <ul className="text-sm">
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr key={`divider-${index}`} className="border-t-[var(--color-second)] my-1" />
          ) : (
            <li
              key={index}
              className={`flex items-center gap-2 px-3 py-1.5 ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed" // ✅ 비활성화 스타일 적용
                  : "hover:bg-[var(--color-prime-hover)] cursor-pointer"
              }`}
              onClick={() => {
                if (!item.disabled && item.onClick) item.onClick(); // ✅ 클릭 방지 처리
                onClose();
              }}
            >
              {item.icon && <span className="w-5 h-5 flex items-center">{item.icon}</span>} {/* ✅ 아이콘 추가 */}
              <span>{item.label}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );

  return ReactDOM.createPortal(menuElement, document.body);
};

export default ContextMenu;
