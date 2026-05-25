import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { searchPhotos } from "../../api/unsplash";

import type { Photo } from "../../types";

//Redux state structure
interface PhotoState {
  photos: Photo[];//Pic fetched from index.ts
  loading: boolean;
  error: string | null;
}

const initialState: PhotoState = {
  photos: [], 
  loading: false,
  error: null,
};

// API thunk
export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",

  async (query: string, { rejectWithValue }) => {
    try {
      const data = await searchPhotos(query);

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
        fetchPhotos.pending,

        (state) => {
          state.loading = true;

          state.error = null;
        },
      )

      // SUCCESS
      .addCase(
        fetchPhotos.fulfilled,

        (state, action) => {
          state.loading = false;

          state.photos = action.payload;
        },
      )

      // ERROR
      .addCase(
        fetchPhotos.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload as string;
        },
      );
  },
});

export default photoSlice.reducer;
