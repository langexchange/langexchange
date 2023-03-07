import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = process.env.REACT_APP_API_UPLOAD;
const baseUrl = "http://localhost:5003";

export interface UploadFileRequest {
  type: "image" | "audio" | "video";
  userId: string;
  body: FormData;
}

export interface UploadFileResponse {
  streamId: string;
  name: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  updatedAt: string;
  fileType: string;
  url: string;
}

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadFileResponse[], UploadFileRequest>({
      query: ({ type, userId, body }) => ({
        url: `api/files/users/${userId}/types/${type}`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
