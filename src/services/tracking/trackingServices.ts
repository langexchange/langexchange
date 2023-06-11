import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../stores/store";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface StaticLearning {
  createdAt: string;
  currentvocabs: number;
  month: number;
  percent: number;
  totalvocabs: number;
  updatedAt: string;
}

export const trackingApi = createApi({
  reducerPath: "trackingApi",
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
    getStaticLearning: builder.query<StaticLearning[], void>({
      query: () => ({
        url: "/api/statistics/learning-process",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStaticLearningQuery } = trackingApi;
