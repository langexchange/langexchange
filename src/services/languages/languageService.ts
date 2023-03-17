import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface Language {
  id: string;
  name: string;
}

export interface GetLanguagesResponse {
  languages: Language[];
}

export const languageApi = createApi({
  reducerPath: "languageApi ",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getLanguages: builder.query<GetLanguagesResponse, undefined>({
      query: () => ({
        url: "api/languages",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLanguagesQuery } = languageApi;