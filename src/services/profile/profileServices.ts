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
    };
  };
}

export interface GetProfileResponse {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: string;
  introduction: string;
  nativeLanguage: Language;
  targetLanguages: Language[];
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
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation<null, ProfileRequest>({
      query: (data) => ({
        url: `api/users/${data.id}/fill-basic-information`,
        method: "POST",
        body: data.body,
      }),
    }),
    getProfile: builder.query<GetProfileResponse, string | undefined>({
      query: (id) => ({
        url: `api/users/${id}/basic-information`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = profileApi;
