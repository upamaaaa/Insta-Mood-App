import { Link } from "react-router-dom";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { VenetianMask } from "lucide-react";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <div className="bg-light text-dark p-2 rounded">
            <VenetianMask size={30} />
          </div>
            <span className="fw-bold fs-4">InstaM꩜꩜d𑣲⋆</span>
        </Link>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <Show when={"signed-out"}>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-light">
                <SignInButton />
              </button>
            </div>
          </Show>

          <Show when={"signed-in"}>
            <div className="d-flex gap-2">
             <UserButton />
             </div>
          </Show>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
