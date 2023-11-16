"use client";
// postsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "./store";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  data: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  data: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    getPostsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getPostsStart, getPostsSuccess, getPostsFailure } =
  postsSlice.actions;

export default postsSlice.reducer;

// Thunk for asynchronous API call
export const fetchPosts = (): AppThunk => async (dispatch: any) => {
  try {
    dispatch(getPostsStart());
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch(getPostsSuccess(response.data));
  } catch (error: any) {
    dispatch(getPostsFailure(error.message));
  }
};
