import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setLanguage } from "@/redux/slices/languageSlice";
import { languageOptions } from "@/language/language.config";
import DropDown from "@/components/common/dropdown/DropDown";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);   

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(setLanguage(newLanguage));
    
  };

  return (
    <DropDown 
        options={languageOptions} 
        selected={language} 
        onChange={handleLanguageChange} 
        isOnlyIcon = {true} />
  );
};

export default LanguageSelector;
