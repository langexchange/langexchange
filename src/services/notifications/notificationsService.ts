import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../stores/store";

const baseUrl = process.env.REACT_APP_API_NOTIFICATION;

export interface Notification {
  notiid: string;
  notifyMessage: string;
  notifiKey: string;
  notifyData: string;
  subNotification: string[];
  type: string;
  postid: string;
  commentid: string;
  createdAt: string;
  updatedAt: string;
}

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
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
    getNotifications: builder.query<Notification[], undefined>({
      query: () => ({
        url: `/api/notifications`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApi;
