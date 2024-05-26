import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type of the request body
        },
        body: JSON.stringify({ username, password }), // Convert the body data to JSON format
      });

      if (response.ok) {
        const { token, officeId } = await response.json(); // Parse the JSON response
        // Store token in local storage
        sessionStorage.setItem("token", token);
        if (officeId) {
          sessionStorage.setItem("officeId", officeId);
        } else {
          sessionStorage.removeItem("officeId");
        }
        // Navigate to the previous URL if available, otherwise navigate to default URL
        if (officeId) {
          navigate("/window");
        } else {
          navigate("/admin");
        }
      } else {
        // Handle login error (e.g., invalid credentials)
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };
  return (
    <div className=" bg-white flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-64 w-auto"
          src="/OIP.jpeg"
          alt="Your Company"
        />
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block font-medium leading-6 text-gray-900 text-2xl"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 bg-transparent text-gray-800 text-4xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-md"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-2xl font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 bg-transparent text-gray-800 text-4xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-md"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 btn btn-lg text-3xl"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
