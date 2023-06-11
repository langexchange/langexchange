import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../stores/store";
import { Profile } from "../profile/profileServices";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface FriendSuggestionsQuery {
  nativeLangs: string[];
  targetLangs: string[];
  countryCodes: string[];
}

export const friendApi = createApi({
  reducerPath: "friendApi",
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
    getFriends: builder.query({
      query: () => ({
        url: "/api/friends",
        method: "GET",
      }),
    }),
    getFriend: builder.query({
      query: (id: string) => ({
        url: `/api/friends/users/${id}`,
        method: "GET",
      }),
    }),
    getFriendSuggestions: builder.query<Profile[], FriendSuggestionsQuery>({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.nativeLangs.forEach((item) => {
          params.append("nativeLangs", item);
        });
        filters.targetLangs.forEach((item) => {
          params.append("targetLangs", item);
        });
        filters.countryCodes.forEach((item) => {
          params.append("countryCodes", item);
        });

        return {
          url: "/api/friends/suggest",
          method: "GET",
          params: params,
        };
      },
    }),
    getFriendRequests: builder.query({
      query: () => ({
        url: "/api/friends/requests",
        method: "GET",
      }),
    }),
    sendFriendRequest: builder.mutation({
      query: (id: string) => ({
        url: `/api/makefriend/users/${id}`,
        method: "POST",
      }),
    }),
    acceptFriendRequest: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `/api/accept/users/${id}`,
        method: "POST",
      }),
    }),
    rejectFriendRequest: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `/api/friends/${id}/request`,
        method: "DELETE",
      }),
    }),
    unfriend: builder.mutation({
      query: (id: string) => ({
        url: `/api/unfriend/users/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetFriendQuery,
  useGetFriendSuggestionsQuery,
  useGetFriendRequestsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useUnfriendMutation,
  useRejectFriendRequestMutation,
} = friendApi;
