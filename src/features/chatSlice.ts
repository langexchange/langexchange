import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";

interface chatState {
  isInit: boolean;
}

const initialState: chatState = {
  isInit: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatStatus: (state, { payload }) => {
      state.isInit = payload;
    },
  },
});

export const { setChatStatus } = chatSlice.actions;

export default chatSlice.reducer;

export const selectCurrentChatStatus = (state: RootState) => state.chat.isInit;
