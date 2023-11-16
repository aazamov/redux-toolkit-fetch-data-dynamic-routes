// postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchPosts.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (
          state: { loading: boolean; data: Post[] },
          action: PayloadAction<Post[]>
        ) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchPosts.rejected,
        (
          state: { loading: boolean; error: string },
          action: PayloadAction<string>
        ) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default postsSlice.reducer;
