import { createSlice } from "@reduxjs/toolkit";

interface UnsplashAuthState {
  unsplashToken: string | null;
}

const token = localStorage.getItem("unsplash_token");

const initialState: UnsplashAuthState = {
  unsplashToken: token && token !== "undefined" ? token : null,
};

const unsplashAuthSlice = createSlice({
  name: "unsplashAuth",

  initialState,

  reducers: {
    setunsplashToken: (state, action) => {
      console.log("SETTING TOKEN:", action.payload);

      state.unsplashToken = action.payload;

      if (action.payload) {
        localStorage.setItem("unsplash_token", action.payload);
      }

      console.log(
        "LOCAL STORAGE TOKEN:",
        localStorage.getItem("unsplash_token"),
      );
    },

    removeUnsplashToken: (state) => {
      state.unsplashToken = null;

      localStorage.removeItem("unsplash_token");
    },
  },
});

export const { setunsplashToken, removeUnsplashToken } = unsplashAuthSlice.actions;

export default unsplashAuthSlice.reducer;
