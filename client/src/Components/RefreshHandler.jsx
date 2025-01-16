import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const Location = useLocation();
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        Location.pathname == "/" ||
        Location.pathname == "/login" ||
        Location.pathname == "/signup"
      ) {
        Navigate("/notes");
      }
    }
  }, [Location, Navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
