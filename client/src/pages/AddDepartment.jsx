import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";

const AddDepartment = () => {
  const notify = () => toast.success("Added a New Window");
  const notifyWarning = () => toast.error("Window Already Exists");
  const navigate = useNavigate();
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [windowName, setWindowName] = useState("");
  const [windowDesc, setWindowDesc] = useState("");
  const [success, setSuccess] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const firstGetWin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/offices`);
      const windowApi = await response.json();
      setOffices(windowApi.offices);
      console.log(offices);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    firstGetWin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedOffice);
    console.log(windowName);
    console.log(windowDesc);
    try {
      const response = await fetch("/api/addDepartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          office: selectedOffice,
          name: windowName,
          description: windowDesc,
        }),
      });

      if (response.ok) {
        notify();
        setSelectedOffice("");
        setWindowName("");
        setWindowDesc("");
      } else if (response.status === 409) {
        notifyWarning();
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (sessionStorage.getItem("token") && isLoading === false) {
    return (
      <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center text-4xl">
        {duplicateWarning && (
          <div role="alert" className="alert alert-warning w-[40%] mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
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
            <span>Warning: Window Already Exists</span>
          </div>
        )}
        {success && (
          <div role="alert" className="alert alert-success w-[40%] mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
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
            <span>Added a New Window!</span>
          </div>
        )}
        <label className="form-control w-full max-w-xs">
          <form onSubmit={handleSubmit}>
            <select
              className="select select-bordered  focus:border-success w-96 text-3xl mb-4"
              name="office"
              required
              value={selectedOffice}
              onChange={(e) => setSelectedOffice(e.target.value)}
            >
              <option value={""} disabled selected>
                SELECT OFFICE
              </option>
              {offices.map((office) => {
                return <option value={office.id}>{office.name}</option>;
              })}
            </select>
            <div className="label">
              <span className="label-text text-4xl text-white">
                Window Name:
              </span>
            </div>
            <input
              type="text"
              placeholder="F1"
              name="name"
              value={windowName}
              onChange={(e) => setWindowName(e.target.value)}
              className="input input-bordered focus:border-success w-96 text-3xl uppercase"
              required
            />
            <div className="label mt-5">
              <span className="label-text text-4xl text-white">
                Window Service:
              </span>
            </div>
            <input
              type="text"
              placeholder="Get Business Permit"
              name="description"
              value={windowDesc}
              onChange={(e) => setWindowDesc(e.target.value)}
              className="input input-bordered focus:border-success w-96 text-3xl uppercase"
              required
            />
            <button
              type="submit"
              className="btn btn-primary mt-8 w-96 text-2xl"
            >
              Add
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
        <Toaster
          toastOptions={{
            className: "w-[40%]",
            success: {
              position: "top-right",
              style: {
                background: "green",
                color: "white",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "1.5rem",
              },
            },
            error: {
              position: "top-right",
              style: {
                background: "red",
                color: "white",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "1.5rem",
              },
            },
          }}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default AddDepartment;
