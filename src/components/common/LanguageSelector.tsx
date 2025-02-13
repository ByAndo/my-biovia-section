import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setLanguage } from "@/redux/slices/languageSlice";
import { languageOptions } from "@/language/language.config";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // ✅ 드롭다운 감지용 Ref

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(setLanguage(newLanguage));
    setIsOpen(false);
  };

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
      {/* 선택된 언어 표시 */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
        style={{ backgroundColor: "var(--color-lang-bg)", color: "var(--color-header)" }}
      >
        {languageOptions.find(lang => lang.value === language)?.nationial} {/* ✅ 현재 선택된 언어 표시 */}
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-36 bg-[var(--color-dropdown-bg)] border border-gray-300 dark:border-gray-600 rounded-md shadow-lg p-2"
          onClick={(e) => e.stopPropagation()} // ✅ 드롭다운 내부 클릭 시 닫히지 않도록 설정
        >
          {languageOptions.map(({ label, value }) => (
            <button
              key={value}
              className="block w-full text-left px-3 py-1.5 hover:bg-[var(--color-dropdown-hover)]"
              onClick={() => handleLanguageChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
