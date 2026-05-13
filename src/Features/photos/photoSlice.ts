import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchPhotos } from "../../api/unsplash";

import type { Photo } from "../../types";

interface PhotoState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

const initialState: PhotoState = {
  photos: [],
  loading: true,
  error: null,
};

// API thunk
export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (query: string) => {
    const data = await searchPhotos(query);
    return data;
  },
);

const photoSlice = createSlice({
  name: "photos",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })

      .addCase(fetchPhotos.rejected, (state) => {
        state.loading = false;

        state.error = "Failed to fetch photos";
      });
  },
});

export default photoSlice.reducer;
