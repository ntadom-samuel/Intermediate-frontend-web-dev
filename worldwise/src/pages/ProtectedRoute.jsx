import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
//This utility redirects users that are not logged in to the main page
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null; //Note: effects work after a component is rendered. So we use the ternary operator to prevent our program from crashing as there are components that need "user" information to be available
}

export default ProtectedRoute;
