import { JSX, useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routers/router.config";
import { FaBook, FaChartBar, FaCog } from "react-icons/fa";
import { getTranslation } from "@/language/language.config";
import useLanguage from "@/hook/useLanguage";

interface SidebarContentProps {
  moduleKey: string;
}

const SidebarContent = ({ moduleKey }: SidebarContentProps) => {
  const notebookRoutes = routes.filter((route) => route.path !== "/");
  const maxSidebarWidth = window.innerWidth * (2 / 3); // 최대 너비: 화면의 2/3
  const [width, setWidth] = useState(256); // 기본 너비
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapseTrigger, setCollapseTrigger] = useState(false); // 숨김 트리거 상태
  const language = useLanguage();

  const moduleIcons: Record<string, JSX.Element> = {
    settings: <FaCog size={14} className="text-[var(--color-accent)]" />,
    dashboard: <FaChartBar size={14} className="text-[var(--color-accent)]" />,
    notebook: <FaBook size={14} className="text-[var(--color-accent)]" />,
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      let newWidth = startWidth + (moveEvent.clientX - startX);

      if (newWidth < 160) {
        if (collapseTrigger) {
          newWidth = 0; // 완전히 숨김
          setIsCollapsed(true);
          setCollapseTrigger(false);
        } else {
          newWidth = 160; // 최소 크기에서 한 번 멈춤
          setCollapseTrigger(true);
        }
      } else {
        setCollapseTrigger(false);
        newWidth = Math.min(newWidth, maxSidebarWidth); // 최대 너비 제한
        setIsCollapsed(false);
      }

      setWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
    className={`relative flex flex-col h-full ${isCollapsed ? "transition-all duration-200" : ""}`}
    style={{ width: isCollapsed ? "0px" : `${width}px` }}
    >
    {!isCollapsed && (
        <div className="bg-[var(--color-second)] text-[var(--color-font)] shadow-md flex-1 p-3">
            <div className="text-[var(--color-font)] p-1 flex items-center">
                {moduleIcons[moduleKey]}
                <h2 className="text-sm font-medium tracking-wide uppercase">
                    {getTranslation(language,'word', moduleKey)}                    
                </h2>
            </div>
        <ul className="space-y-1 text-sm">
            {moduleKey === "notebook"
            ? notebookRoutes.map((route) => (
                <li key={route.path}>
                    <Link to={route.path} className="block p-2 hover:bg-[var(--color-prime-hover)] rounded">
                        {getTranslation(language,'word', route.code)}                    
                    </Link>
                </li>
                ))
            : moduleKey === "dashboard"
            ? [
                <li key="analytics">
                    <Link to="/dashboard/analytics" className="block p-2 hover:bg-[var(--color-prime-hover)] rounded">
                        {getTranslation(language,'word', 'analytics')}
                    </Link>
                </li>,
                <li key="reports">
                    <Link to="/dashboard/reports" className="block p-2 hover:bg-[var(--color-prime-hover)] rounded">
                        {getTranslation(language,'word', 'reports')}  
                    </Link>
                </li>,
                ]
            : [
                <li key="profile">
                    <Link to="/settings/profile" className="block p-2 hover:bg-[var(--color-prime-hover)] rounded">
                        {getTranslation(language,'word', 'profile')}
                    </Link>
                </li>,
                <li key="security">
                    <Link to="/settings/security" className="block p-2 hover:bg-[var(--color-prime-hover)] rounded">
                        {getTranslation(language,'word', 'security')}
                    </Link>
                </li>,
                ]}
        </ul>
        </div>
    )}

    {/* 크기 조절 핸들 */}
    <div
        className={`absolute top-0 right-0 h-full w-[3px] cursor-ew-resize transition-opacity duration-200 ${
        isResizing || isCollapsed ? "opacity-100 bg-gray-600 dark:bg-gray-700" : "opacity-50 hover:opacity-100"
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
        setIsCollapsed(false);
        setWidth(maxSidebarWidth); // 더블 클릭 시 최대 크기로 확장
        }}
    />
    </div> 
  );
};

export default SidebarContent;
