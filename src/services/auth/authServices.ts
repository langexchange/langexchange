import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../stores/store";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface User {
  id: string;
  incId: number;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  id: string;
  incId: number;
  firstName: string;
  lastName: string;
  token: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, AuthRequest>({
      query: (credentials) => ({
        url: "api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<LoginResponse, AuthRequest>({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<undefined, string>({
      query: (email) => ({
        url: "/api/auth/send-mail?email=" + email,
        method: "POST",
      }),
    }),
    clearCookie: builder.mutation<undefined, undefined>({
      query: () => ({
        url: "/api/cookies",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useClearCookieMutation,
} = authApi;
