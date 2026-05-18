import { useEffect } from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import { Show, SignIn } from "@clerk/react";

import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";

import MoodBoard from "./pages/MoodBoard";

import AuthCallback from "./pages/AuthCallback";

import { ErrorBoundary } from "react-error-boundary";

import { getCollectionPhotos } from "./api/unsplash";

import { setLikedPhotos } from "./Features/Moodboard/moodboardSlice";
import { useAppSelector } from "./app/hooks";

function App() {
  const dispatch = useDispatch();

  const accessToken = useAppSelector((state) => state.unsplashAuth.accessToken);

  useEffect(() => {
    const syncCollection = async () => {
      if (accessToken) {
        const collectionPhotos = await getCollectionPhotos(accessToken);

        dispatch(setLikedPhotos(collectionPhotos));
      }
    };

    syncCollection();
  }, [accessToken, dispatch]);

  return (
    <>
      <ErrorBoundary fallback={<div>Something Went wrong</div>}>
        <Show when="signed-out">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <SignIn forceRedirectUrl="/home" />
          </div>
        </Show>

        <Show when="signed-in">
          <Navbar />

          <Routes>
            <Route path="/home" element={<Home />} />

            <Route path="/moodboard" element={<MoodBoard />} />

            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Show>
      </ErrorBoundary>
    </>
  );
}

export default App;
