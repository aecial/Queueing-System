import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import EmployeeManagerRow from "../components/EmployeeManagerRow";
const EmployeeManager = () => {
  const navigate = useNavigate();
  const [offices, setOffices] = useState([]);
  const [officeId, setOfficeId] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const updateUsersList = async () => {
    setIsLoading(true);
    try {
      const userResponse = await fetch("/api/users");
      const userApi = await userResponse.json();
      setUsers(userApi);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const firstGetWin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/offices`);
      const windowApi = await response.json();
      setOffices(windowApi.offices);
      const userResponse = await fetch("/api/users");
      const userApi = await userResponse.json();
      setUsers(userApi);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const reset = () => {
    setUsername("");
    setPassword("");
    setOfficeId(0);
    setWarning(false);
    setSuccess(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setWarning(true);
      setPassword("");
      setConfirmPassword("");
    } else {
      try {
        const response = await fetch("/api/register", {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Specify the content type of the request body
          },
          body: JSON.stringify({ username, password, officeId }), // Convert the body data to JSON format
        });
        if (response.ok) {
          setSuccess(true);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    firstGetWin();
  }, []);
  if (sessionStorage.getItem("token") && !isLoading) {
    return (
      <div className="text-white min-w-screen min-h-screen flex justify-center items-center text-4xl">
        <div className="w-[60%] p-4 flex justify-center">
          <div className="overflow-x-auto">
            <table className="table  text-4xl">
              {/* head */}
              <thead className="text-4xl font-bold">
                <tr className="font-bold text-white">
                  <th>Username</th>
                  <th>Office</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <EmployeeManagerRow
                      id={user.id}
                      username={user.username}
                      officeId={user.officeId}
                      office={user.office.name}
                      updateUsersList={updateUsersList}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex w-[40%] justify-center items-center">
          {warning && (
            <div role="alert" className="alert alert-warning mb-10 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Warning: Password Do not Match</span>
              <button onClick={() => setWarning(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          )}
          {success && (
            <div role="alert" className="alert alert-success w-full mb-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Added User: {username}</span>
              <div>
                <button onClick={reset} className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <label className="form-control w-full max-w-xs">
            <form onSubmit={handleSubmit}>
              <select
                className="select select-bordered select-primary  focus:border-success w-96 text-3xl mb-4"
                name="office"
                required
                value={officeId}
                onChange={(e) => setOfficeId(e.target.value)}
              >
                <option value={0} disabled>
                  SELECT OFFICE
                </option>
                {offices.map((office) => {
                  return <option value={office.id}>{office.name}</option>;
                })}
              </select>
              <div className="label">
                <span className="label-text text-4xl text-white">
                  Username:
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered focus:border-success w-96 text-3xl "
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="label mt-5">
                <span className="label-text text-4xl text-white">
                  Password:{" "}
                </span>
              </div>
              <input
                type="password"
                className="input input-bordered focus:border-success w-96 text-3xl "
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="label mt-5">
                <span className="label-text text-4xl text-white">
                  Confirm Password:{" "}
                </span>
              </div>
              <input
                type="password"
                className="input input-bordered focus:border-success w-96 text-3xl "
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={officeId === 0}
                className="btn btn-primary mt-8 w-96 text-2xl"
              >
                Add User
              </button>
              <button
                type="button"
                className="btn btn-neutral mt-8 w-96 text-2xl"
                onClick={() => navigate("/admin")}
              >
                Back
              </button>
            </form>
          </label>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default EmployeeManager;
