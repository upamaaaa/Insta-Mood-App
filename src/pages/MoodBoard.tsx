import { useAppSelector } from "../app/hooks";

import PhotoCard from "../components/PhotoCard";

function MoodBoard() {
  const likedPhotos = useAppSelector((state) => state.moodBoard.likedPhotos);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Mood Board</h1>
      {likedPhotos.length === 0 ? (
        <p>No liked photos yet</p>
      ) : (
        <div className="row">
          {likedPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MoodBoard;
