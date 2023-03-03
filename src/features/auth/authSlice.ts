import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/auth/authServices";
import { RootState } from "../../stores/store";

interface AuthState {
  user: User | null;
  token: string | null;
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
      state.user = payload.user;
      state.token = payload.token;
      if (payload.persist) {
        localStorage.setItem("user", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
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
    };
  }

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (user && token) {
    return {
      user: JSON.parse(user),
      token,
    };
  }
  return null;
};
