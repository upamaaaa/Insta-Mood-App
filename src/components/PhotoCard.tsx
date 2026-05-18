import type { Photo } from "../types";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { useOptimistic } from "react";

import { Heart } from "lucide-react";

import { toggleLike } from "../Features/Moodboard/moodboardSlice";

import { addToCollection, removeFromCollection } from "../api/unsplash";

interface Props {
  photo: Photo;
}
//to receve object
function PhotoCard({ photo }: Props) {
  const dispatch = useAppDispatch();

  const likedPhotos = useAppSelector((state) => state.moodBoard.likedPhotos);

  const accessToken = useAppSelector((state) => state.unsplashAuth.accessToken);

  const isLikedInitially = likedPhotos.some((p) => p.id === photo.id);

  // optimistic UI
  const [optimisticLike, setOptimisticLike] = useOptimistic(
    isLikedInitially,

    (currentState: boolean, newState: boolean) => newState,
  );

  const handleLike = async () => {
    console.log("TOKEN FROM REDUX:", accessToken);

    const nextLikedState = !optimisticLike;

    // instantly update UI
    setOptimisticLike(nextLikedState);

    // redux update
    dispatch(toggleLike(photo));

    try {
      if (nextLikedState) {
        await addToCollection(photo.id, accessToken!);
      } else {
        await removeFromCollection(photo.id, accessToken!);
      }
    } catch (error) {
      console.error("Failed to update Unsplash collection:", error);
    }
  };

  console.log(photo);

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm position-relative">
        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          className="card-img-top"
          style={{
            height: "300px",
            objectFit: "cover",
          }}
        />

        {/* heart button */}
        <button
          onClick={handleLike}
          className="btn position-absolute top-0 end-0 m-2 bg-white rounded-circle"
        >
          <Heart
            color={optimisticLike ? "red" : "black"}
            fill={optimisticLike ? "red" : "none"}
          />
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
