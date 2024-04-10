import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  async function getDepartments() {
    const response = await fetch(`/api/departments`);
    const departments = await response.json();
    setDepartments(departments.departments);
  }
  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className="bg-gray-800 text-white min-h-screen">
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
  );
};

export default Home;
