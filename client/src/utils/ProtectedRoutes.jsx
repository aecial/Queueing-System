import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("token");
      if (sessionStorage.getItem("officeId")) {
        navigate("/window");
      }
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }

      setIsLoading(false);
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
