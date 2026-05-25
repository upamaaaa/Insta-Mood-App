import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Show } from "@clerk/react";
import { useDispatch } from "react-redux";
import { Navbar } from "./components/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import { getCollectionPhotos } from "./api/unsplash";
import { setLikedPhotos } from "./Features/Moodboard/moodboardSlice";
import { useAppSelector } from "./app/hooks";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const MoodBoard = lazy(() => import("./pages/MoodBoard"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const SignIn = lazy(() =>
  import("@clerk/react").then((module) => ({ default: module.SignIn })),
);

function App() {
  const dispatch = useDispatch();
  const accessToken = useAppSelector(
    (state) => state.unsplashAuth.unsplashToken,
  );
  useEffect(() => {
    const syncLikedPhotos = async () => {
      if (accessToken) {
        const collectionPhotos = await getCollectionPhotos(accessToken);
        dispatch(setLikedPhotos(collectionPhotos));
      }
    };
    syncLikedPhotos();
  }, [accessToken, dispatch]);

  return (
    <>
      <Suspense fallback={<div> Loading</div>}>
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
      </Suspense>
    </>
  );
}

export default App;
