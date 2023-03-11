import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface AttachedFile {
  type: "image" | "audio" | "video";
  url: string;
}

export interface Post {
  postId: string;
  userId: string;
  langId: string;
  langName: string;
  text: string;
  label: string;
  labels: string[];
  isPublic: boolean;
  isTurnOffComment: boolean;
  isTurnOffCorrection: boolean;
  isTurnOffShare: boolean;
  isUserInteracted: boolean;
  imagePost: AttachedFile[];
  audioPost: AttachedFile[];
  videoPost: AttachedFile[];
  userInfo: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: AttachedFile | null;
  };
  createdAt: string;
  updatedAt: string | null;
  numOfInteract: number;
  numOfCmt: number;
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

export interface InteractPostRequest {
  userId: string;
  postId: string;
  mode: 0 | 1; // 0: like, 1: unlike
}

export const postApi = createApi({
  reducerPath: "postApi ",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllPostOfUser: builder.query<Post[], string | null>({
      query: (userId) => ({
        url: `api/users/${userId}/posts`,
        method: "GET",
      }),
    }),
    getNumOfInteract: builder.query<number, string>({
      query: (postId) => ({
        url: `api/posts/${postId}/interacts`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation<string, CreateLanguageRequest>({
      query: (data) => ({
        url: `api/users/${data.userId}/post/create`,
        method: "POST",
        body: data.body,
      }),
    }),
    interactPost: builder.mutation<string, InteractPostRequest>({
      query: (data) => ({
        url: `/api/users/${data.userId}/interact/${data.mode}/posts/${data.postId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostOfUserQuery,
  useInteractPostMutation,
  useLazyGetNumOfInteractQuery,
} = postApi;
