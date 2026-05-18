import { Link } from "react-router-dom";

import { Show, UserButton } from "@clerk/react";

import { VenetianMask, Heart } from "lucide-react";

import { useSelector } from "react-redux";

export function Navbar() {
  const likedCount = useSelector((state) => state.moodBoard.likedPhotos.length);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <Link
          to="/home"
          className="navbar-brand d-flex align-items-center gap-2"
        >
          <VenetianMask size={30} />

          <span className="fw-bold fs-4">InstaM꩜꩜d𑣲⋆</span>
        </Link>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/moodboard"
              className="btn btn-outline-light d-flex align-items-center gap-2"
            >
              <Heart size={18} />
              Moodboard
              <span className="badge bg-danger">{likedCount}</span>
            </Link>

            <Show when={"signed-in"}>
              <UserButton />
            </Show>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
