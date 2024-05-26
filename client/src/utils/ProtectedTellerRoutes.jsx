import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedTellerRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [userOffice, setUserOffice] = useState(null);
  const location = useLocation();
  const { department } = useParams();

  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("token");
      const officeId = sessionStorage.getItem("officeId");

      if (officeId) {
        setUserOffice(officeId);
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

        if (response.ok && officeId) {
          setIsAuthenticated(true);
          await fetchDepartments(officeId);
        } else {
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }

      setIsLoading(false);
    };

    const fetchDepartments = async (officeId) => {
      try {
        const response = await fetch(`/api/deptByOffice/${officeId}`);
        if (response.ok) {
          const information = await response.json();
          setDepartments(information.department);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
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
    return <Navigate to="/" />;
  }

  const isUserOfficeAuthorized = departments.some(
    (dep) => dep.id === parseInt(department, 10)
  );

  if (!isUserOfficeAuthorized) {
    return <Navigate to="/window" />;
  }

  return <Outlet />;
};

export default ProtectedTellerRoutes;
