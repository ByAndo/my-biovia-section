import { FaBell } from "react-icons/fa";
import RoundIconButton from "../common/buttons/RoundIconButton";

const Notification = () => {
    const handleClick = () => {
        console.log("종 클릭!"); // 추후 실제 로그아웃 기능 적용
      };    
  return (
    <RoundIconButton 
        onClick={handleClick} 
    >
        <div className="relative">        
            <FaBell className="text-xl" />
            <span   className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: "red" }}>
            </span>        
        </div>
    </RoundIconButton>       
  );
};

export default Notification;
