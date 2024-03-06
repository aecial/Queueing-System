import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="border border-white p-2">
        <h3>Room 1</h3>
        <button
          onClick={() => navigate("/room", { state: { room: 1 } })}
          className="m-4 border border-white p-1"
        >
          Join Room
        </button>
      </div>
      <div className="border border-white p-2">
        <h3>Room 2</h3>
        <button
          onClick={() => navigate("/room", { state: { room: 2 } })}
          className="m-4 border border-white p-1"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
