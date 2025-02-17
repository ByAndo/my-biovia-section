import Avatar from "@/components/avatar/Avatar";
import Notification from "@/components/notification/Notification";
import { FaSignOutAlt } from "react-icons/fa";
import RoundIconButton from "../common/buttons/RoundIconButton";
import LanguageSelector from "@/language/LanguageSelector";
// import LogoutButton from "./LogoutButton";

const UtilityBar = () => {
    const handleLogout = () => {
        console.log("로그아웃 실행!"); // 추후 실제 로그아웃 기능 적용
      };

    return (
        <div className="flex items-center gap-1">  
                  
            {/* 언어 아이콘 */}
            <LanguageSelector />
            {/* 알림 아이콘 */}
            <Notification />
            {/* 아바타 */}
            <Avatar />
            {/* 로그아웃 버튼 */}
            {/* 로그아웃 버튼 */}
            <RoundIconButton 
                onClick={handleLogout} 
            >
                <FaSignOutAlt className="text-xl" />
            </RoundIconButton>
        </div>
    );
};

export default UtilityBar;
