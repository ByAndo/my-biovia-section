import React, { useEffect, useRef, useState } from 'react'
import RoundIconButton from '../buttons/RoundIconButton';

export interface DropDownOption {
    code : string;
    label: string;
    value?: string;
    color?: string;
}

export interface DropDownProps {
    options : DropDownOption[];
    selected: string;
    onChange: (value: string) => void;    
    isOnlyIcon?: boolean;
}

const DropDown : React.FC<DropDownProps> = ({options, selected, onChange, isOnlyIcon} : DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);  
    const dropdownRef = useRef<HTMLDivElement>(null); 
    
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
            {isOnlyIcon === true ?
                <RoundIconButton
                    onClick={() => setIsOpen(!isOpen)}
                    style={{fontWeight : "bold"}}
                >
                    {options.find(lang => lang.code === selected)?.value} {/* ✅ 현재 선택된 언어 표시 */}
                </RoundIconButton>              
            :

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 p-1 h-8 text-sm border rounded-md bg-[var(--color-prime)] text-[var(--color-font)] w-36"
                >
                    <div className={`w-4 h-4 rounded-full border border-gray-400 shadow-md ${options.find((t) => t.value === selected)?.color}`} />
                        {options.find((t) => t.code === selected)?.label}
                </button>  
            }            
            {/* 드롭다운 버튼 */}


            {/* 드롭다운 리스트 */}
            {isOpen && (                
                <div className="absolute left-0 mt-1 w-36 border rounded-md border-[var(--color-second)] shadow-lg bg-[var(--color-prime)] text-[var(--color-font)]">
                    {options.map(({ code, label, color }) => (
                        <div
                            key={code}
                            onClick={() => {
                                onChange(code);
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-[var(--color-prime-hover)] cursor-pointer"
                        >
                            {color &&
                                <div className={`w-4 h-4 rounded-full border border-gray-400 shadow-md ${color}`} />
                            }
                            {label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropDown;