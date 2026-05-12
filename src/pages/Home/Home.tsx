import { useEffect, useState } from "react";

import { searchPhotos } from "../../api/unsplash";

import type { Photo } from "../../types";

function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const [search, setSearch] = useState("nature");

  const fetchPhotos = async () => {
    const data = await searchPhotos(search);

    setPhotos(data);
  };

  useEffect(() => {
     fetchPhotos();
  }, []);

  return (
    <div className="container mt-4">

    
      <div className="mb-4">

        <input
          type="text"
          className="form-control"
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn btn-dark mt-3"
          onClick={fetchPhotos}
        >
          Search
        </button>

      </div>

     
      <div className="row">

        {photos.map((photo) => (
          <div
            className="col-md-4 mb-4"
            key={photo.id}
          >
            <div className="card shadow-sm">

              <img
                src={photo.urls.regular}
                alt={photo.alt_description}
                className="card-img-top"
                style={{
                  height: "300px",
                  objectFit: "cover",
                }}
              />

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;