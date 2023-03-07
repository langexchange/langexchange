import { createSlice } from "@reduxjs/toolkit";

interface PostState {
  posts: [] | null;
}

const initialState: PostState = {
  posts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});

export const { } = postSlice.actions;

export default postSlice.reducer;
