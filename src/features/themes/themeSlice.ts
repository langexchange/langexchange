import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";

interface ThemeState {
  backgroundColor: string;
}

if (!localStorage.getItem("theme")) {
  const theme = {
    backgroundColor: "#f0f2f5",
  };
  localStorage.setItem("theme", JSON.stringify(theme));
}

const initialState: ThemeState = localStorage.getItem("theme")
  ? JSON.parse(localStorage.getItem("theme")!)
  : {
    backgroundColor: "#f0f2f5",
  };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.backgroundColor =
        state.backgroundColor === "#fff" ? "#f0f2f5" : "#fff";
      localStorage.setItem("theme", JSON.stringify(state));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
export const selectCurrentBackgroundColor = (state: RootState) =>
  state.theme.backgroundColor;
