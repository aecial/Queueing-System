import { useState, useEffect } from "react";
import WindowManagerRow from "../components/WindowManagerRow";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
const WindowManager = () => {
  const navigate = useNavigate();
  const [windows, setWindows] = useState([]);
  const [offices, setOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState();
  const firstGetWin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/departments`);
      const windowApi = await response.json();
      setWindows(windowApi.departments);
      const responseOffices = await fetch(`/api/offices`);
      const windowApiOffices = await responseOffices.json();
      setOffices(windowApiOffices.offices);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    firstGetWin();
  }, []);
  const updateWindows = async () => {
    setIsLoading(true);
    try {
      if (selectedOffice) {
        const response = await fetch(`/api/deptByOffice/${selectedOffice}`);
        setSelectedOffice(selectedOffice);
        const offices = await response.json();
        setWindows(offices.department);
      } else {
        const response = await fetch(`/api/departments`);
        const windowApi = await response.json();
        setWindows(windowApi.departments);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelect = async (office) => {
    const response = await fetch(`/api/deptByOffice/${office}`);
    setSelectedOffice(office);
    const offices = await response.json();
    setWindows(offices.department);
  };
  return (
    <div className="bg-gray-800 min-h-screen text-white text-4xl p-4">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center">
            <select
              className="select select-accent w-full max-w-xs text-3xl"
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option disabled selected>
                SELECT OFFICE
              </option>
              {offices.map((office) => {
                return (
                  <option key={office.id} value={office.id}>
                    {office.name}
                  </option>
                );
              })}
            </select>
            <button
              type="button"
              className="btn btn-primary w-20 text-2xl"
              onClick={() => navigate("/admin")}
            >
              Back
            </button>
          </div>
          <table className="table table-zebra text-3xl">
            <thead>
              <tr>
                <th className="font-bold text-white text-2xl">Window</th>
                <th className="font-bold text-white text-2xl">
                  Window Service/Description
                </th>
                <th className="font-bold text-white text-2xl">Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {windows ? (
                windows.map((window) => {
                  return (
                    <WindowManagerRow
                      key={window.id}
                      id={window.id}
                      name={window.name}
                      description={window.description}
                      updateWindows={updateWindows}
                    />
                  );
                })
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WindowManager;
