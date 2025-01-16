import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { toast } from "react-toastify";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const Navigate=useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    toast.success("Logout successfully!",{autoClose:1500,position:"top-center"})
    setTimeout(
      ()=>{

        Navigate('/login')
      },1000
    )
  };

  return (
    <div className="Navbar">
      <h1 className="logo">
        <NoteAltIcon fontSize="2rem" />
        E-Notebook
      </h1>
      <nav>
        <ul>
          {isAuthenticated && (
            <li>
              <Link to="/notes">Home</Link>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
