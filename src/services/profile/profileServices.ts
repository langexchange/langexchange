import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../stores/store";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface Language {
  id: string;
  name?: string;
  level: number;
}

export interface ProfileRequest {
  id: string;
  body: {
    nativeLanguage: Language;
    targetLanguages: Language[];
    userInfo: {
      firstName: string;
      lastName: string;
      gender?: string | null;
      introduction?: string;
      hobbies?: string[];
      country?: string;
    };
  };
}

export interface Profile {
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  introduction: string;
  isFriend?: boolean;
  country: string;
  nativeLanguage: Language;
  targetLanguages: Language[];
  hobbies: string[];
  numOfPosts: number;
  numOfPartners: number;
  avatar: string | null;
}

export interface GetProfileResponse extends Profile { }

export interface UpdateAvatarRequest {
  id: string;
  avatar: string;
}

export const profileApi = createApi({
  reducerPath: "profileApi",
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
    updateProfile: builder.mutation<null, ProfileRequest>({
      query: (data) => ({
        url: `api/users/${data.id}/fill-basic-information`,
        method: "POST",
        body: data.body,
      }),
    }),
    updateAvatar: builder.mutation<null, UpdateAvatarRequest>({
      query: (data) => ({
        url: `api/users/${data.id}/change-avatar?avatar=${encodeURIComponent(
          data.avatar
        )}`,
        method: "POST",
      }),
    }),
    getProfile: builder.query<GetProfileResponse, string | undefined>({
      query: (id) => ({
        url: `api/users/${id}/basic-information`,
        method: "GET",
      }),
    }),
    getAllProfiles: builder.query<GetProfileResponse[], void>({
      query: () => ({
        url: `api/users`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateAvatarMutation,
  useGetAllProfilesQuery,
} = profileApi;
