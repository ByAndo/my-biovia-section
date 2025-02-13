import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // ✅ 개발 환경에서 Redux DevTools 활성화
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
