import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../stores/store";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface Vocabulary {
  vocabId?: string;
  term: string;
  define: string;
  imageUrl: string;
}

export interface VocabularySetUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

interface PracticeInfo {
  isPracticed: boolean;
  totalVocabs: number;
  currentNumOfVocab: number;
}

export interface VocabularySet {
  packageId: string;
  userId: string;
  title: string;
  description: string;
  isPublic: boolean;
  termLocale: string;
  defineLocale: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string | null;
  vocabularyDtos: Vocabulary[];
  practiceResultDto: PracticeInfo;
}

export interface VocabularySetDetail {
  userInfo: VocabularySetUserInfo;
  vocabularyPackageDtos: VocabularySet[];
}

export interface CreateVocabularySetRequest {
  title: string;
  description: string;
  isPublic: boolean;
  termLocale: string;
  defineLocale: string;
  imageUrl: string;
  vocabularyPairs: Vocabulary[];
}

export interface VocabularyPracticeOverview {
  currentNumOfVocab: number;
  description: string;
  packageId: string;
  title: string;
  totalVocabs: number;
}

export interface VocabularyPractice {
  packageId: string;
  practiceVocabularies: Vocabulary[];
}

export interface UpdateVocabularySetRequest {
  id: string;
  body: CreateVocabularySetRequest;
}

export interface FilterVocabularySet {
  terms: string[];
  defines: string[];
}

export interface TrackingVocabularyRequest {
  id: string;
  body: {
    vocabTrackings: {
      vocabularyId: string;
      quality: number;
    }[];
  };
}

export const vocabularyApi = createApi({
  reducerPath: "vocabularyApi",
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
    createVocabularySet: builder.mutation<
      undefined,
      CreateVocabularySetRequest
    >({
      query: (body) => ({
        url: "api/vocabulary/create",
        method: "POST",
        body,
      }),
    }),
    updateVocabularySet: builder.mutation<
      undefined,
      UpdateVocabularySetRequest
    >({
      query: ({ id, body }) => ({
        url: `api/vocabularies/${id}/update`,
        method: "PUT",
        body,
      }),
    }),
    getVocabularySet: builder.query<VocabularySetDetail, string>({
      query: (id) => ({
        url: `api/vocabularies/${id}`,
        method: "GET",
      }),
    }),
    getUserVocabularySets: builder.query<VocabularySetDetail, string>({
      query: (id) => ({
        url: `/api/users/${id}/vocabularies`,
        method: "GET",
      }),
    }),
    getVocabularySets: builder.query<VocabularySetDetail, undefined>({
      query: () => ({
        url: `api/vocabularies`,
        method: "GET",
      }),
    }),
    getSuggestVocabularySets: builder.query<
      VocabularySetDetail[],
      FilterVocabularySet | undefined
    >({
      query: (filters) => {
        const params = new URLSearchParams();
        filters?.terms?.forEach((item) => {
          params.append("terms", item);
        });
        filters?.defines?.forEach((item) => {
          params.append("defines", item);
        });
        return {
          url: "api/vocabularies/explore",
          method: "GET",
          params: params,
        };
      },
    }),
    cloneVocabularySet: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `/api/vocabularies/${id}/clone`,
        method: "POST",
      }),
    }),
    deleteVocabularySet: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `/api/vocabularies/${id}`,
        method: "DELETE",
      }),
    }),
    addToPractice: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `/api/vocabularies/${id}/put-in-practice-list`,
        method: "POST",
      }),
    }),
    removeFromPractice: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `/api/vocabularies/${id}/put-out-practice-list`,
        method: "POST",
      }),
    }),
    getPracticeList: builder.query<VocabularyPracticeOverview[], undefined>({
      query: () => ({
        url: `/api/practice-list/overview`,
        method: "GET",
      }),
    }),
    getPracticeSet: builder.query<VocabularyPractice, string>({
      query: (id) => ({
        url: `/api/practice-list/vocabularies/${id}`,
        method: "GET",
      }),
    }),
    trackingVocabulary: builder.mutation<undefined, TrackingVocabularyRequest>({
      query: ({ id, body }) => ({
        url: `/api/practice-list/vocabularies/${id}/tracking`,
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateVocabularySetMutation,
  useGetSuggestVocabularySetsQuery,
  useGetVocabularySetQuery,
  useCloneVocabularySetMutation,
  useGetVocabularySetsQuery,
  useDeleteVocabularySetMutation,
  useUpdateVocabularySetMutation,
  useRemoveFromPracticeMutation,
  useAddToPracticeMutation,
  useGetPracticeListQuery,
  useGetPracticeSetQuery,
  useGetUserVocabularySetsQuery,
  useTrackingVocabularyMutation,
} = vocabularyApi;
