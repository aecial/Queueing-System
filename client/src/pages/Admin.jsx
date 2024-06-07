import React from "react";
import AdminCard from "../components/AdminCard";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../components/LoginDiv";

const Admin = () => {
  const navigate = useNavigate();
  if (sessionStorage.getItem("token")) {
    return (
      <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center">
        <button
          className="btn btn-primary absolute right-10 top-20"
          onClick={() => navigate("/logout")}
        >
          Logout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
        <div className="grid grid-cols-4 gap-4">
          <AdminCard
            title={"Add Window"}
            src={"addDept.svg"}
            onClick={() => navigate("/add-window")}
          />
          <AdminCard
            title={"Add User"}
            src={"addUser.svg"}
            onClick={() => navigate("/add-employee")}
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
