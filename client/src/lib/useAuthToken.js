import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

export default useAuthToken;
