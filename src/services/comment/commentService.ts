import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../stores/store";
import { AttachedFile } from "../post/postService";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface Comment {
  commentId: string;
  userId: string;
  postId: string;
  text: string;
  correctcmt: string | null;
  audiocmts: AttachedFile[] | [];
  imagecmts: AttachedFile[] | [];
  numOfInteract: number;
  isUserInteracted: boolean;
  userInfo: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateCommentRequest {
  userId: string;
  postId: string;
  body: {
    text: string;
    correctcmt: string | null;
    audiocmts: AttachedFile[] | [];
    imagecmts: AttachedFile[] | [];
  };
}

export interface UpdateCommentRequest extends CreateCommentRequest {
  commentId: string;
}

export interface DeleteCommentRequest {
  userId: string;
  postId: string;
  commentId: string;
}

export interface InteractCommentRequest {
  userId: string;
  commentId: string;
  mode: 0 | 1; // 0: like, 1: unlike
}

export const commentApi = createApi({
  reducerPath: "commentApi",
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
    getComments: builder.query<Comment[], string | null>({
      query: (postId) => ({
        url: `api/posts/${postId}/comments`,
        method: "GET",
      }),
    }),
    getNumOfInteract: builder.query<number, string>({
      query: (commentId) => ({
        url: `/api/comments/${commentId}/interacts`,
        method: "GET",
      }),
    }),
    interactComment: builder.mutation<undefined, InteractCommentRequest>({
      query: (data) => ({
        url: `/api/users/${data.userId}/interact/${data.mode}/comments/${data.commentId}`,
        method: "POST",
      }),
    }),
    createComment: builder.mutation<string, CreateCommentRequest>({
      query: (data) => ({
        url: `api/users/${data.userId}/posts/${data.postId}/comment/create`,
        method: "POST",
        body: data.body,
      }),
    }),
    updateComment: builder.mutation<string, UpdateCommentRequest>({
      query: (data) => ({
        url: `api/users/${data.userId}/posts/${data.postId}/comments/${data.commentId}/update`,
        method: "PUT",
        body: data.body,
      }),
    }),
    deleteComment: builder.mutation<string, DeleteCommentRequest>({
      query: (data) => ({
        url: `api/users/${data.userId}/posts/${data.postId}/comments/${data.commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useInteractCommentMutation,
  useLazyGetNumOfInteractQuery,
} = commentApi;
