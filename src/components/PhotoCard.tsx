import type { Photo } from "../types";

interface Props {
  photo: Photo;
}

function PhotoCard({photo}: Props) {

  return (

    <div className="col-md-4 mb-4">

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
  );
}

export default PhotoCard;