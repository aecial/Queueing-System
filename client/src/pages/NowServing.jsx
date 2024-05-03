import React, { useEffect, useState } from "react";
import ServingCard from "../components/ServingCard";
import socket from "../lib/socket";

const NowServing = () => {
  const [windows, setWindows] = useState([]);

  const getWin = async () => {
    const response = await fetch(`/api/departments`);
    const windowApi = await response.json();
    setWindows(windowApi.departments);
  };
  useEffect(() => {
    getWin();
  }, []);
  useEffect(() => {
    socket.on("refresh", getWin);
    return () => {
      socket.off("refresh", getWin);
    };
  }, [getWin]);
  // Split the windows array into two arrays, each containing half of the windows
  const halfLength = Math.ceil(windows.length / 2);
  console.log(halfLength);
  const firstColumn = windows.slice(0, halfLength);
  console.log(firstColumn);
  const secondColumn = windows.slice(halfLength);
  console.log(secondColumn);

  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl">NOW SERVING</h1>
      <div className="w-[80%] max-h-screen">
        <div className="grid grid-cols-2 w-auto gap-x-1 gap-y-5 text-center">
          <div>
            {firstColumn.map((window) => (
              <ServingCard
                key={window.id}
                winNum={window.id}
                ticket={window.now_serving}
              />
            ))}
          </div>
          <div>
            {secondColumn.map((window) => (
              <ServingCard
                key={window.id}
                winNum={window.id}
                ticket={window.now_serving}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowServing;
