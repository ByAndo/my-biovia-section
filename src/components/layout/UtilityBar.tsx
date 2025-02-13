import Avatar from "@/components/avatar/Avatar";
import Notification from "@/components/notification/Notification";
import { FaSignOutAlt } from "react-icons/fa";
import LanguageSelector from "../common/LanguageSelector";
// import LogoutButton from "./LogoutButton";

const UtilityBar = () => {
    const handleLogout = () => {
        console.log("로그아웃 실행!"); // 추후 실제 로그아웃 기능 적용
      };

    return (
        <div className="flex items-center gap-4">        
            {/* 언어 아이콘 */}
            <LanguageSelector />
            {/* 알림 아이콘 */}
            <Notification />
            {/* 아바타 */}
            <Avatar />
            {/* 로그아웃 버튼 */}
            {/* 로그아웃 버튼 */}
            <button 
                onClick={handleLogout} 
                className="transition-colors duration-300"
                style={{ 
                    color: "var(--color-notification-icon)", 
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-notification-badge)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-notification-icon)"}
            >
                <FaSignOutAlt className="text-xl" />
            </button>
        </div>
    );
};

export default UtilityBar;
