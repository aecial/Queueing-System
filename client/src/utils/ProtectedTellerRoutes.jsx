import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedTellerRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userOffice, setUserOffice] = useState(null);
  const location = useLocation();
  const { department } = useParams(); // Get department from URL params

  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("token");
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
          setUserOffice(data.office); // Assuming the response contains the user's office information
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

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check office from session storage
  const officeFromSession = sessionStorage.getItem("office");

  // Define allowed departments based on office
  const allowedDepartments = {
    Office1: ["1", "2"], // Replace with actual department IDs or names
    Office2: ["3"],
    // Add more offices and departments as needed
  };

  // Check if the user is allowed to access the department
  const isAllowed = allowedDepartments[officeFromSession]?.includes(department);

  if (!isAllowed) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedTellerRoutes;
