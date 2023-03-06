import { createSlice } from "@reduxjs/toolkit";
import { Language } from "../../services/languages/languageService";
import { RootState } from "../../stores/store";

interface LanguageState {
  languages: Language[] | null;
}

const initialState: LanguageState = {
  languages: null,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguages: (state, { payload }) => {
      state.languages = payload;
    },
  },
});

export const { setLanguages } = languageSlice.actions;

export default languageSlice.reducer;
export const selectLanguages = (state: RootState) => state.language.languages;
