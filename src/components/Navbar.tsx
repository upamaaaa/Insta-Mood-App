import { Link, useLocation } from "react-router-dom";
import { Show, UserButton } from "@clerk/react";
import { VenetianMask, Heart, FolderHeart } from "lucide-react"; 
import { useSelector } from "react-redux";

export function Navbar() {
  const likedCount = useSelector((state: any) => state.moodBoard.likedPhotos.length);
  const location = useLocation();

  return (
    <nav 
      className="navbar navbar-expand navbar-dark sticky-top"
      style={{ 
        background: "#8c3030", 
        padding: "0.6rem 0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">

       
        <Link to="/home" className="navbar-brand d-flex align-items-center gap-2">
          <VenetianMask size={28} />
          <span className="fw-bold fs-4">InstaM꩜꩜d𑣲⋆</span>
        </Link>

        
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div className="d-flex align-items-center gap-4">
            
          
            <Link 
              to="/moodboard" 
              className="d-flex align-items-center gap-2 text-decoration-none text-white position-relative"
              style={{ fontSize: "1.05rem", fontWeight: "500" }}
            >
              <FolderHeart size={22} color="#ffb3b3" /> 
            
            </Link>

            <div className="d-flex align-items-center gap-1 text-white">
              <Heart 
                size={20} 
                color={likedCount > 0 ? "#ff4d4d" : "#ffffff"} 
                fill={likedCount > 0 ? "#ff4d4d" : "none"} 
              />
              {likedCount > 0 && (
                <span className="badge rounded-circle bg-white text-dark ms-1 fw-bold" style={{ fontSize: "0.75rem" }}>
                  {likedCount}
                </span>
              )}
            </div>
            
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