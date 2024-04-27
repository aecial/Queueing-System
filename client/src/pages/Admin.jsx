import React from "react";
import AdminCard from "../components/AdminCard";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 gap-4">
        <AdminCard title={"Add Department"} src={"addDept.svg"} />
        <AdminCard
          title={"View Report"}
          onClick={() => navigate("/report")}
          src={"viewReport.svg"}
        />
        <AdminCard title={"Generate Report"} src={"createReport.svg"} />
        <AdminCard title={"Remove"} src={"remove.svg"} />
      </div>
    </div>
  );
};

export default Admin;