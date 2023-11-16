

// postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SubCategory {
  id: number;
  slug: string;
  name: string;
}

interface Image {
  large: string;
  medium: string;
  small: string;
  thumbnail: string;
  original: string;
}

interface NewsItem {
  id: number;
  sub_category: SubCategory;
  title: string;
  brief: string;
  image: Image;
  video: string | null;
  pub_date: string;
  url: string;
  tags: string[];
}

interface NewsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

interface NewsState {
  data: NewsItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("news/fetchPosts", async () => {
  try {
    const response = await axios.get<NewsApiResponse>(
      "https://api.zamon.uz/api/v3/uz/news/list"
    );
    return response.data.results;
  } catch (error) {
    // If there's an error, throw an exception and let the thunk middleware handle it
    throw new Error("An error occurred while fetching news.");
  }
});

const newsSlice = createSlice({
  name: "news",
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
          state: { loading: boolean; data: NewsApiResponse[] },
          action: PayloadAction<NewsApiResponse[]>
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

export default newsSlice.reducer;
