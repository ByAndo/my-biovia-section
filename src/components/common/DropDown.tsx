import { useEffect, useRef, useState } from "react";

interface DropDownOption {
  label: string;
  value: string;
  color: string;
}

interface DropDownProps {
  options: DropDownOption[];
  selected: string;
  onChange: (value: string) => void;
}

const DropDown = ({ options, selected, onChange }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // ✅ 드롭다운 감지용 Ref

    // ✅ 외부 클릭 감지 → 드롭다운 자동 닫기
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
  
      if (isOpen) {
        window.addEventListener("click", handleClickOutside);
      }
  
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
        {/* 드롭다운 버튼 */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1 h-8 text-sm border rounded-md bg-[var(--color-dropdown)] text-[var(--color-text)] w-36"
        >
            <div className={`w-4 h-4 rounded-full border border-gray-400 shadow-md ${options.find((t) => t.value === selected)?.color}`} />
            {options.find((t) => t.value === selected)?.label}
        </button>

        {/* 드롭다운 리스트 */}
        {isOpen && (
            <div className="absolute left-0 mt-1 w-36 border rounded-md shadow-lg bg-[var(--color-dropdown-bg)] text-[var(--color-text)]">
            {options.map(({ label, value, color }) => (
                <div
                key={value}
                onClick={() => {
                    onChange(value);
                    setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-[var(--color-dropdown-hover)] cursor-pointer"
                >
                <div className={`w-4 h-4 rounded-full border border-gray-400 shadow-md ${color}`} />
                {label}
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default DropDown;
