import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const Home = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getDepartments() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/departments`);
      const departments = await response.json();
      setDepartments(departments.departments);
    } catch (error) {
      console.error("Error fetching Departments:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {departments.map((department) => {
            return (
              <div className="border border-white p-2">
                <h3>{department.name}</h3>
                <button
                  onClick={() => navigate(`/watcher/${department.id}`)}
                  className="m-4 border border-white p-1"
                >
                  {department.name} Watcher
                </button>
              </div>
            );
          })}
          <hr />
          {departments.map((department) => {
            return (
              <div className="border border-white p-2">
                <h3>{department.name}</h3>
                <button
                  onClick={() => navigate(`/window/${department.id}`)}
                  className="m-4 border border-white p-1"
                >
                  {department.name} Window
                </button>
              </div>
            );
          })}
          <hr />
          <hr className="text-white" />
          <button
            onClick={() => navigate("/kiosk")}
            className="m-4 border border-white p-1"
          >
            Kiosk
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
