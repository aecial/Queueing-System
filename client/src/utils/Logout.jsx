import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle the logout process
    const handleLogout = () => {
      // Clear the token and other relevant data from session storage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("officeId");
      // Optionally, clear other data such as user info
      // sessionStorage.removeItem('user');

      // Redirect the user to the login page
      navigate("/");
    };

    // Call the logout function
    handleLogout();
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;
