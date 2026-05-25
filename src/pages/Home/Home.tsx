import { useCallback, useEffect, useRef, useTransition } from "react";
import debounce from "lodash.debounce";
import PhotoCard from "../../components/PhotoCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPhotosApi } from "../../Features/photos/photoSlice";
import { infiniteScroll } from "../../hooks/InfiniteScroll";

export default function Home() {
  const dispatch = useAppDispatch();
  const { photos, loading, photosError } = useAppSelector(
    (state) => state.photos,
  );
  const accessToken = useAppSelector(
    (state) => state.unsplashAuth.unsplashToken,
  );

  // TRANSITION
  const [isPending, startTransition] = useTransition();

  // Scroll Define
  const photoContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomDivRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(1);
  const queryRef = useRef("nature");
  const debouncedResultsRef = useRef<ReturnType<typeof debounce> | null>(null);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      startTransition(() => {
        // if input is empty
        if (value.trim() === "") {
          pageRef.current = 1;
          queryRef.current = "nature";
          dispatch(fetchPhotosApi({ query: "nature", page: 1 }));
          return;
        }

        pageRef.current = 1;
        queryRef.current = value;
        dispatch(fetchPhotosApi({ query: value, page: 1 }));
      });
    },
    [dispatch],
  );

  //  Filters
  const handleCategory = (category: string) => {
    pageRef.current = 1;
    startTransition(() => {
      dispatch(fetchPhotosApi({ query: category, page: 1 }));
    });
  };

  useEffect(() => {
    debouncedResultsRef.current = debounce(handleChange, 500);

    return () => {
      debouncedResultsRef.current?.cancel();
    };
  }, [handleChange]);

  // INITIAL LOAD
  useEffect(() => {
    const getPhoto = async () => {
      pageRef.current = 1;
      queryRef.current = "nature";
      dispatch(fetchPhotosApi({ query: "nature", page: 1 }));
    };

    getPhoto();

    return () => {
      debouncedResultsRef.current?.cancel();
    };
  }, [accessToken, dispatch]);

  //scroll

  useEffect(() => {
    if (!bottomDivRef.current) return;

    const cleanup = infiniteScroll(bottomDivRef.current, () => {
      pageRef.current += 1;
      dispatch(
        fetchPhotosApi({
          query: queryRef.current,
          page: pageRef.current,
        }),
      );
    });

    return cleanup;
  }, [dispatch]);

  return (
    <div className="bg-container">
      <div className="container">
        {!accessToken && (
          <a
            href={`https://unsplash.com/oauth/authorize?client_id=jAs2onJiWcW-Y1Kud5VerPftowQ1oEkQ6ocYz7YKNY4&redirect_uri=http://localhost:5173/auth/callback&response_type=code&scope=public+write_collections`}
            className="btn btn-dark mb-4"
          >
            Connect Unsplash
          </a>
        )}

        {/* SEARCH */}

        <div className="mb-4 p-5">
          <input
            type="text"
            placeholder="Search photos..."
            onChange={(e) => debouncedResultsRef.current?.(e)}
            className="form-control"
          />
        </div>

        <div className="d-flex gap-2 mb-4 flex-wrap">
          <button
            className="btn btn-outline-danger rounded-pill px-4"
            onClick={() => handleCategory("minimalist")}
          >
            Minimalist
          </button>

          <button
            className="btn btn-outline-danger rounded-pill px-4"
            onClick={() => handleCategory("industrial")}
          >
            Industrial
          </button>

          <button
            className="btn btn-outline-danger rounded-pill px-4"
            onClick={() => handleCategory("vibrant")}
          >
            Vibrant
          </button>
        </div>

        {(loading || isPending) && <p>Loading photos..</p>}

        {/* UI ERROR */}
        {photosError && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center">
            <span>{photosError}</span>

            <button
              className="btn btn-sm btn-dark"
              onClick={() => {
                pageRef.current = 1;
                queryRef.current = "nature";
                dispatch(fetchPhotosApi({ query: "nature", page: 1 }));
              }}
            >
              Retry
            </button>
          </div>
        )}

        <div className="row photoContainer" ref={photoContainerRef}>
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
        <div ref={bottomDivRef} style={{ height: "1px" }} />
      </div>
    </div>
  );
}
