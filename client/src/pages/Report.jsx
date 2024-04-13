import React, { useEffect, useState } from "react";

const Report = () => {
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
    <div className="text-white min-w-screen min-h-screen flex justify-center items-center">
      <div>
        <select className="select select-primary w-full max-w-xs">
          <option disabled selected>
            Select Department
          </option>
          <option>ALL</option>
          {departments.map((department) => {
            return <option value={department.name}>{department.name}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default Report;
