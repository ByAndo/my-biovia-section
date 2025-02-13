import { useState } from "react";
import { FaCog, FaChartBar, FaBook } from "react-icons/fa";
import SidebarContent from "./SidebarContent";

const modules = [
  { label: "설정", icon: <FaCog size={20} />, code: "settings" },
  { label: "대쉬보드", icon: <FaChartBar size={20} />, code: "dashboard" },
  { label: "연구노트", icon: <FaBook size={20} />, code: "notebook" },
];


const Sidebar = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <div className="flex h-full">
      {/* 모듈 아이콘 사이드바 */}
      <aside className="w-14 bg-[var(--color-sidebar)] text-[var(--color-text)] flex flex-col items-center py-4">
        {modules.map((module) => (
          <button
            key={module.code}
            className={`w-full flex items-center justify-center py-3 hover:bg-[var(--color-dropdown-hover)] ${
              activeModule === module.code ? "border-l-4 border-[var(--color-accent)] bg-[var(--color-accent)] text-white" : ""
            }`}
            onClick={() => setActiveModule(activeModule === module.code ? null : module.code)}
          >
            {module.icon}
          </button>
        ))}
      </aside>

      {/* 선택된 모듈의 서브 메뉴 */}
      {activeModule && <SidebarContent moduleKey={activeModule} />}
    </div>
  );
};

export default Sidebar;
