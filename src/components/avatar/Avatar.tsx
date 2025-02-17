import { FaUser } from "react-icons/fa";
import RoundIconButton from "../common/buttons/RoundIconButton";

const Avatar = () => {
    const handleClick = () => {
        console.log("아바타 클릭릭!"); // 추후 실제 로그아웃 기능 적용
      };
    return (
        <RoundIconButton
            onClick={handleClick}
        >            
            <FaUser className="text-xl" />
        </RoundIconButton>    
      
    );
  };
  
  export default Avatar;
  