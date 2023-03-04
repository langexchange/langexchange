import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/auth/authServices";
import { RootState } from "../../stores/store";

interface ProfileState {
  user: User | null;
  token: string | null;
}

const initialState: ProfileState = {
  user: null,
  token: null,
};

const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const { } = profileSlice.actions;

export default profileSlice.reducer;
