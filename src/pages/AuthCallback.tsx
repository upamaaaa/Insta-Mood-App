import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { getAccessToken } from "../api/unsplash";

import { setunsplashToken } from "../Features/unsplashAuthSlice/unsplashAuthSlice";

function AuthCallback() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // Run when oage loads
  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);

      const code = params.get("code");

      if (!code) return;

      try {
        const data = await getAccessToken(code);

        console.log("ACCESS TOKEN:", data.access_token);
        //token arrives
        dispatch(setunsplashToken(data.access_token));
        navigate("/");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Token fetch failed:", error.message);
        }
      }
    };

    fetchToken();
  }, [dispatch, navigate]);

  return (
    <div className="container mt-5">
      <h3>Authenticating..</h3>
    </div>
  );
}

export default AuthCallback;
