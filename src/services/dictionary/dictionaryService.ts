import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

interface License {
  name: string;
  url: string;
}

interface Phonetics {
  text?: string;
  audio?: string;
  sourceUrl?: string;
  license?: License;
}

interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

export interface WordDictionary {
  word: string;
  phonetics: Phonetics[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

export const dictionaryApi = createApi({
  reducerPath: "dictionaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    lookupWord: builder.query<WordDictionary[], string | null>({
      query: (word) => ({
        url: `${word}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyLookupWordQuery } = dictionaryApi;
