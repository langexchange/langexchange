import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../stores/store";

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

export interface CreatePostRequest {
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

export interface UpdatePostRequest extends CreatePostRequest {
  postId: string;
}

export interface InteractPostRequest {
  userId: string;
  postId: string;
  mode: 0 | 1; // 0: like, 1: unlike
}

export interface updateModePostRequest {
  userId: string;
  postId: string;
  mode: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // 0: isPublic, 1: isPrivate, 2: deletePost, 3: isTurnOffComment, 4: isTurnOffShare, 5: isTurnOffCorrection, 6: onShare, 7: onCorrect
}

export interface PostSuggestionQuery {
  filterLangs: string[];
  isNewest: boolean;
  isOnlyFriend: boolean;
}

export const postApi = createApi({
  reducerPath: "postApi ",
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
    getAllPostOfUser: builder.query<Post[], string | null>({
      query: (userId) => ({
        url: `api/users/${userId}/posts`,
        method: "GET",
      }),
    }),
    getPost: builder.query<Post, string | null>({
      query: (postId) => ({
        url: `api/posts/${postId}`,
        method: "GET",
      }),
    }),
    getNumOfInteract: builder.query<number, string>({
      query: (postId) => ({
        url: `api/posts/${postId}/interacts`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation<string, CreatePostRequest>({
      query: (data) => ({
        url: `api/users/${data.userId}/post/create`,
        method: "POST",
        body: data.body,
      }),
    }),
    updatePost: builder.mutation<string, UpdatePostRequest>({
      query: (data) => ({
        url: `api/users/${data.userId}/posts/${data.postId}/update`,
        method: "PUT",
        body: data.body,
      }),
    }),
    updateModePost: builder.mutation<undefined, updateModePostRequest>({
      query: (data) => ({
        url: `api/users/${data.userId}/posts/${data.postId}/configure/${data.mode}`,
        method: "PUT",
      }),
    }),
    interactPost: builder.mutation<string, InteractPostRequest>({
      query: (data) => ({
        url: `/api/users/${data.userId}/interact/${data.mode}/posts/${data.postId}`,
        method: "POST",
      }),
    }),
    getPostSuggestions: builder.query<Post[], PostSuggestionQuery>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        queryParams.filterLangs.forEach((lang) => {
          params.append("filterLangs", lang);
        });

        params.append("isNewest", queryParams.isNewest.toString());
        params.append("isOnlyFriend", queryParams.isOnlyFriend.toString());

        return {
          url: `api/posts/suggest`,
          params: params,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetAllPostOfUserQuery,
  useInteractPostMutation,
  useLazyGetNumOfInteractQuery,
  useUpdatePostMutation,
  useUpdateModePostMutation,
  useGetPostSuggestionsQuery,
} = postApi;
