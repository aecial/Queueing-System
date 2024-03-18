import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  async function getDepartments() {
    const response = await fetch(`http://localhost:8080/departments`);
    const departments = await response.json();
    setDepartments(departments.departments);
  }
  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      {/* {rooms.map((room) => {
        return (
          <div className="border border-white p-2">
            <h3>Room {room}</h3>
            <button
              onClick={() => navigate("/room", { state: { room } })}
              className="m-4 border border-white p-1"
            >
              Join Room {room}
            </button>
          </div>
        );
      })} */}
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
      <hr className="text-white" />
      <button
        onClick={() => navigate("/watcher")}
        className="m-4 border border-white p-1"
      >
        Watcher
      </button>
    </div>
  );
};

export default Home;
