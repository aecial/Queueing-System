import React from "react";

import { useNavigate } from "react-router-dom";
const LoginDiv = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-4xl mb-10 text-red-500">Authentication Required</h1>
      <button
        className="btn btn-primary btn-lg text-4xl"
        onClick={() => navigate("/login")}
      >
        LOGIN
      </button>
    </div>
  );
};

export default LoginDiv;
