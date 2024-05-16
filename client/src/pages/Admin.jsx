import React from "react";
import AdminCard from "../components/AdminCard";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../components/LoginDiv";

const Admin = () => {
  const navigate = useNavigate();
  if (sessionStorage.getItem("token")) {
    return (
      <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-4">
          <AdminCard
            title={"Add Window"}
            src={"addDept.svg"}
            onClick={() => navigate("/add-window")}
          />
          <AdminCard
            title={"View Report"}
            onClick={() => navigate("/report")}
            src={"viewReport.svg"}
          />
          {/* <AdminCard title={"Generate Report"} src={"createReport.svg"} /> */}
          <AdminCard
            title={"Manage Windows"}
            onClick={() => navigate("/window-manager")}
            src={"remove.svg"}
          />
        </div>
      </div>
    );
  } else {
    return <LoginDiv />;
  }
};

export default Admin;
