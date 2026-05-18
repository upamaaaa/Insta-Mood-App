import { useEffect, useMemo, useTransition } from "react";
import debounce from "lodash.debounce";
import PhotoCard from "../../components/PhotoCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPhotos } from "../../Features/photos/photoSlice";

function Home() {
  const dispatch = useAppDispatch();
  const { photos, loading, error } = useAppSelector((state) => state.photos);
  const accessToken = useAppSelector((state) => state.unsplashAuth.accessToken);

  // TRANSITION
  const [isPending, startTransition] = useTransition();

  // SEARCH INPUT
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    try {
      startTransition(() => {
        //if input is empty
        if (value.trim() === "") {
          dispatch(fetchPhotos("nature"));
          return;
        }
        //for search
        dispatch(fetchPhotos(value));
      });
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  //  Filters
  const handleCategory = (category: string) => {
    startTransition(() => {
      dispatch(fetchPhotos(category));
    });
  };

  // Debounce
  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 500);
  }, []);

  // INITIAL LOAD
  useEffect(() => {
    const getPhoto = async () => {
      // homepage photos
      dispatch(fetchPhotos("nature"));

      // collection
    };

    getPhoto();

    return () => {
      debouncedResults.cancel();
    };
  }, [accessToken , dispatch ,debouncedResults]);

  return (
    <div className="container mt-4">
      {!accessToken && (
        <a
          href={`https://unsplash.com/oauth/authorize?client_id=jAs2onJiWcW-Y1Kud5VerPftowQ1oEkQ6ocYz7YKNY4&redirect_uri=http://localhost:5173/auth/callback&response_type=code&scope=public+write_collections`}
          className="btn btn-dark mb-4"
        >
          Connect Unsplash
        </a>
      )}

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search photos..."
          onChange={debouncedResults}
          className="form-control"
        />
      </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        <button
          className="btn btn-outline-dark"
          onClick={() => handleCategory("minimalist")}
        >
          Minimalist
        </button>

        <button
          className="btn btn-outline-dark"
          onClick={() => handleCategory("industrial")}
        >
          Industrial
        </button>

        <button
          className="btn btn-outline-dark"
          onClick={() => handleCategory("vibrant")}
        >
          Vibrant
        </button>
      </div>

      {/* LOADING */}
      {(loading || isPending) && <p>Loading photos..</p>}

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>

          <button
            className="btn btn-sm btn-dark"
            onClick={() => dispatch(fetchPhotos("nature"))}
          >
            Retry
          </button>
        </div>
      )}

      <div className="row">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default Home;
