import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: localStorage.getItem("language") || "ko", // 기본값: 한국어
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload); // 로컬스토리지에 저장
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
