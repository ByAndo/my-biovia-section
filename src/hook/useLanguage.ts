import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

/**
 * 현재 선택된 언어를 가져오는 커스텀 훅
 * @returns 현재 설정된 언어 코드 (예: "ko", "en", "ja")
 */
const useLanguage = () : string => {
  return useSelector((state: RootState) => state.language.language);
};

export default useLanguage;
