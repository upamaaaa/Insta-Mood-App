import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Photo } from "../../types";

interface MoodBoardState {
  likedPhotos: Photo[];
}

const initialState: MoodBoardState = {
  likedPhotos: [],
};

const moodboardSlice = createSlice({
  name: "moodboard",

  initialState,

  reducers: {
    toggleLike: (state, action: PayloadAction<Photo>) => {
      const exists = state.likedPhotos.find(
        (photo) => photo.id === action.payload.id,
      );

      // remove if already liked
      if (exists) {
        state.likedPhotos = state.likedPhotos.filter(
          (photo) => photo.id !== action.payload.id,
        );
      }

      // add if not liked
      else {
        state.likedPhotos.push(action.payload);
      }
    },

    // SET ALL LIKED PHOTOS
    setLikedPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.likedPhotos = action.payload;
    },
  },
});

export const { toggleLike, setLikedPhotos } = moodboardSlice.actions;

export default moodboardSlice.reducer;
