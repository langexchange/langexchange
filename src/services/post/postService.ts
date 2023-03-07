import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface Post {
  id: string;
  name: string;
}

export interface AttachedFile {
  type: "image" | "audio" | "video";
  url: string;
}

export interface CreateLanguageRequest {
  userId: string;
  body: {
    langId: string;
    text: string;
    label: string;
    labels?: string[];
    isTurnOffComment: boolean;
    isTurnOffCorrection: boolean;
    isTurnOffShare: boolean;
    isPublic: boolean;
    imagePost?: AttachedFile[];
    audioPost?: AttachedFile[];
    videoPost?: AttachedFile[];
  };
}

export const postApi = createApi({
  reducerPath: "postApi ",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation<string, CreateLanguageRequest>({
      query: (data) => ({
        url: `api/users/${data.userId}/post/create`,
        method: "POST",
        body: data.body,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postApi;
