import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import WindowCard from "../components/WindowCard";
const WindowPicker = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function getDepartments() {
      const officeId = sessionStorage.getItem("officeId");
      const response = await fetch(`/api/deptByOffice/${officeId}`);
      const departments = await response.json();
      setDepartments(departments.department);
    }
    getDepartments();
  }, []);
  return (
    <div className="bg-gray-800 min-h-screen text-white text-4xl flex flex-col items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {departments.map((department) => {
            return (
              <WindowCard
                key={department.id}
                num={department.name}
                onClick={() => navigate(`/window/${department.id}`)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WindowPicker;
