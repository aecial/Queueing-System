import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const rooms = [1, 2, 3, 4, 5];
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      {rooms.map((room) => {
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
      })}
    </div>
  );
};

export default Home;
