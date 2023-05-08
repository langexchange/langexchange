import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";

interface AuthState {
  userId: string | null;
  incId: string | null;
  token: string | null;
  persist?: boolean;
  jid: string | null;
}

const userId = localStorage.getItem("userId");
const incId = localStorage.getItem("incId");
const token = localStorage.getItem("token");
const persist = localStorage.getItem("persist") === "true";
const jid = localStorage.getItem("jid");

const initialState: AuthState = {
  userId: userId,
  incId: incId,
  token: token,
  persist: persist,
  jid: jid,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      if (payload.user) {
        state.userId = payload.user.id;
        state.incId = payload.user.incId;
        state.jid = payload.jid;
      }
      if (payload.token) state.token = payload.token;

      if (payload.persist || state.persist) {
        if (payload.user) {
          localStorage.setItem("userId", payload.user.id);
          localStorage.setItem("incId", payload.user.incId);
          localStorage.setItem("jid", payload.jid);
        }
        if (payload.token) localStorage.setItem("token", payload.token);
        localStorage.setItem("persist", "true");
      }
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("incId");
      localStorage.removeItem("token");
      localStorage.removeItem("persist");
      localStorage.removeItem("jid");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) => state.auth.userId;
export const selectCurrentUserIncId = (state: RootState) => state.auth.incId;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCredentials = (state: RootState) => state.auth;
