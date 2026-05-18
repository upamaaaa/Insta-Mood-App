import { createSlice } from "@reduxjs/toolkit";

interface UnsplashAuthState {
  accessToken: string | null;
}

const token = localStorage.getItem("unsplash_token");

const initialState: UnsplashAuthState = {
  accessToken: token && token !== "undefined" ? token : null,
};

const unsplashAuthSlice = createSlice({
  name: "unsplashAuth",

  initialState,

  reducers: {
    setAccessToken: (state, action) => {
      console.log("SETTING TOKEN:", action.payload);

      state.accessToken = action.payload;

      if (action.payload) {
        localStorage.setItem("unsplash_token", action.payload);
      }

      console.log(
        "LOCAL STORAGE TOKEN:",
        localStorage.getItem("unsplash_token"),
      );
    },

    logoutUnsplash: (state) => {
      state.accessToken = null;

      localStorage.removeItem("unsplash_token");
    },
  },
});

export const { setAccessToken, logoutUnsplash } = unsplashAuthSlice.actions;

export default unsplashAuthSlice.reducer;
