import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "../Features/photos/photoSlice";
import moodboardReducer from "../Features/Moodboard/moodboardSlice";
import unsplashAuthReducer from "../Features/unsplashAuthSlice/unsplashAuthSlice";

export const store = configureStore({
  reducer: {
    photos: photoReducer,
    moodBoard: moodboardReducer,
    unsplashAuth: unsplashAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
