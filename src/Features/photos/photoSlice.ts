import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { searchPhotosFromUnsplash } from "../../api/unsplash";

import type { Photo } from "../../types";

//Redux state structure
interface PhotoState {
  photos: Photo[]; //Pic fetched from index.ts
  loading: boolean;
  photosError: string | null;
}

const initialState: PhotoState = {
  photos: [],
  loading: false,
  photosError: null,
};

// API thunk
export const fetchPhotosApi = createAsyncThunk(
  "photos/fetchPhotos",

  async (
    {
      query,
      page,
    }: {
      query: string;
      page: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await searchPhotosFromUnsplash(query, page);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch photos. Please try again.");
    }
  },
);

const photoSlice = createSlice({
  name: "photos",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // PENDING
      .addCase(
        fetchPhotosApi.pending,

        (state) => {
          state.loading = true;

          state.photosError = null;
        },
      )

      // SUCCESS
      .addCase(
        fetchPhotosApi.fulfilled,

        (state, action) => {
          const page = action.meta.arg.page;
          if (page === 1) {
            state.photos = action.payload;
          } else {
            state.photos = [...state.photos, ...action.payload];
          }
          state.loading = false;
        },
      )

      // ERROR
      .addCase(
        fetchPhotosApi.rejected,

        (state, action) => {
          state.loading = false;

          state.photosError = action.payload as string;
        },
      );
  },
});

export default photoSlice.reducer;
