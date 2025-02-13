import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: typeof window !== "undefined" 
    ? localStorage.getItem("theme") || "white-mode" 
    : "white-mode",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload); // ✅ Redux 상태 변경 시 localStorage 반영
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
