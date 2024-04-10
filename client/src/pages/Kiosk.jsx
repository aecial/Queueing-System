import React, { useEffect, useState } from "react";
import socket from "../lib/socket";
const Kiosk = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(1);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    async function getDepartments() {
      const response = await fetch("/api/departments");
      const departments = await response.json();
      setDepartments(departments.departments);
    }
    getDepartments();
  }, []);
  const sendTicket = () => {
    // console.log(department);
    // alert(`${name} - ${number}`);
    socket.emit("create_ticket", { name, department });
    setName("");
    setDepartment(1);
  };
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5">
      <h1 className="text-4xl text-center">Kiosk</h1>
      <label htmlFor="number">Department : </label>
      <select
        name="department"
        id="department"
        className="text-black"
        value={department}
        onChange={(e) => setDepartment(Number(e.target.value))}
      >
        {departments.map((departmentInfo) => {
          return (
            <option value={departmentInfo.id}>{departmentInfo.name}</option>
          );
        })}
      </select>
      <label htmlFor="name">Name : </label>
      <input
        type="text"
        name="name"
        id="name"
        className="text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={sendTicket} className="m-4 border border-white p-1">
        Submit
      </button>
    </div>
  );
};

export default Kiosk;
