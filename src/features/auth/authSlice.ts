import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/auth/authServices";
import { RootState } from "../../stores/store";

interface AuthState {
  user: User | null;
  token: string | null;
  persist?: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      if (payload.user) {
        state.user = payload.user;
      }
      if (payload.token) {
        state.token = payload.token;
      }
      if (payload.persist || state.persist) {
        state.persist = payload.persist;
        localStorage.setItem("user", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
        localStorage.setItem("persist", "true");
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCredentials = (state: RootState) => {
  if (state.auth.user && state.auth.token) {
    return {
      user: state.auth.user,
      token: state.auth.token,
      persist: state.auth.persist,
    };
  }

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const persist = localStorage.getItem("persist") === "true";
  if (user && token) {
    return {
      user: JSON.parse(user),
      token,
      persist,
    };
  }
  return { user: null, token: null };
};
