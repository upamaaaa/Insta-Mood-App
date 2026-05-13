import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

import { searchPhotos } from "../../api/unsplash";
import PhotoCard from "../../components/PhotoCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../../features/photos/photoSlice";

function Home() {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.photos);

  // API search
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    try {
      if (value.trim() === "") {
        dispatch(fetchPhotos("nature"));
        return;
      }
      dispatch(fetchPhotos(value));
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 500);
  }, []);

  useEffect(() => {
    const getPhoto = async () => {
      dispatch(fetchPhotos("nature"));
    };
    getPhoto();
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search photos..."
          onChange={debouncedResults}
          className="form-control"
        />
      </div>

      <div className="row">
        {photos.map((photo) => (
          <PhotoCard photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default Home;
