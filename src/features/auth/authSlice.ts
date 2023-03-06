import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";

interface AuthState {
  userId: string | null;
  token: string | null;
  persist?: boolean;
}

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const persist = localStorage.getItem("persist") === "true";

const initialState: AuthState = {
  userId: userId,
  token: token,
  persist: persist,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      if (payload.user) state.userId = payload.user.id;
      if (payload.token) state.token = payload.token;

      if (payload.persist || state.persist) {
        if (payload.user) localStorage.setItem("userId", payload.user.id);
        if (payload.token) localStorage.setItem("token", payload.token);
        localStorage.setItem("persist", "true");
      }
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("persist");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) => state.auth.userId;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCredentials = (state: RootState) => state.auth;
