import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import languageReducer from "../features/languages/languageSlice";
import postReducer from "../features/post/postSlice";
import themeReducer from "../features/themes/themeSlice";
import { authApi } from "../services/auth/authServices";
import { profileApi } from "../services/profile/profileServices";
import { languageApi } from "../services/languages/languageService";
import { postApi } from "../services/post/postService";
import { uploadApi } from "../services/upload/uploadService";
import { commentApi } from "../services/comment/commentService";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    profile: profileReducer,
    [languageApi.reducerPath]: languageApi.reducer,
    language: languageReducer,
    [postApi.reducerPath]: postApi.reducer,
    post: postReducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      languageApi.middleware,
      postApi.middleware,
      uploadApi.middleware,
      commentApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
