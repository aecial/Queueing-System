import { useState, useEffect } from "react";
import WindowManagerRow from "../components/WindowManagerRow";
import Loader from "../components/Loader";
const WindowManager = () => {
  const [windows, setWindows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const firstGetWin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/departments`);
      const windowApi = await response.json();
      setWindows(windowApi.departments);
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
      const response = await fetch(`/api/departments`);
      const windowApi = await response.json();
      setWindows(windowApi.departments);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-800 min-h-screen text-white text-4xl p-4">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-3xl">
            {/* head */}
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
              {/* row 1 */}
              {windows.map((window) => {
                return (
                  <WindowManagerRow
                    key={window.id}
                    id={window.id}
                    name={window.name}
                    description={window.description}
                    updateWindows={updateWindows}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WindowManager;
