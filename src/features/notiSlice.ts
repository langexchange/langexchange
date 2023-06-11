import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";

interface notiState {
  readList: string[];
}

const initialState: notiState = {
  readList: localStorage.getItem("readList")?.split(",") || [],
};

const notiSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    setReadList: (state, { payload }) => {
      state.readList = payload;
      // update local storage
      localStorage.setItem("readList", payload.join(","));
    },
  },
});

export const { setReadList } = notiSlice.actions;

export default notiSlice.reducer;

export const selectReadNotification = (state: RootState) => state.noti.readList;
