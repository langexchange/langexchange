import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chatSlice";
import notiReducer from "../features/notiSlice";
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
import { friendApi } from "../services/friend/friendService";
import { vocabularyApi } from "../services/vocabulary/vocabularyService";
import { dictionaryApi } from "../services/dictionary/dictionaryService";
import { notificationsApi } from "../services/notifications/notificationsService";
import { trackingApi } from "../services/tracking/trackingServices";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    chat: chatReducer,
    noti: notiReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    profile: profileReducer,
    [languageApi.reducerPath]: languageApi.reducer,
    language: languageReducer,
    [postApi.reducerPath]: postApi.reducer,
    post: postReducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [friendApi.reducerPath]: friendApi.reducer,
    [vocabularyApi.reducerPath]: vocabularyApi.reducer,
    [dictionaryApi.reducerPath]: dictionaryApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [trackingApi.reducerPath]: trackingApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      languageApi.middleware,
      postApi.middleware,
      uploadApi.middleware,
      commentApi.middleware,
      friendApi.middleware,
      vocabularyApi.middleware,
      dictionaryApi.middleware,
      notificationsApi.middleware,
      trackingApi.middleware
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
