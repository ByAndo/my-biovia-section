import ko from "./ko.json";
import en from "./en.json";
import ja from "./ja.json";

type languageProps = {
    label: string;
    value: string;
    nationial: string;
};

// ✅ 언어 옵션 목록
export const languageOptions: Array<languageProps> = [
    { label: "🇰🇷 한국어", value: "ko", nationial: "KO" },
    { label: "🇺🇸 English", value: "en", nationial: "EN" },
    { label: "🇯🇵 日本語", value: "ja", nationial: "JA" },
];

// ✅ 언어 데이터 매핑
const languageFiles: Record<string, unknown> = { ko, en, ja };

// ✅ 선택된 언어 코드 반환 함수
export function getLanguageNationalCode(label: string): string | undefined {
    return languageOptions.find((lang) => lang.label === label)?.nationial;
}

// ✅ 언어 키 기반 번역 반환 함수
export const getTranslation = (lang: string, langType: string, key: string): string => {  
    const langpack : Record<string, unknown> = languageFiles[lang] as Record<string, unknown>;  
    const wordCollection: Record<string, unknown> = langpack[langType] as Record<string, unknown>;    
    return wordCollection[key] as string; 
};
