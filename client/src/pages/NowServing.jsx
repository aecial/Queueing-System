import React, { useEffect, useState } from "react";
import ServingCard from "../components/ServingCard";
import socket from "../lib/socket";
import Loader from "../components/Loader";

const NowServing = () => {
  const [windows, setWindows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getWin = async () => {
    const response = await fetch(`/api/departments`);
    const windowApi = await response.json();
    setWindows(windowApi.departments);
  };

  const firstGetWin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/departments`);
      const windowApi = await response.json();
      setWindows(windowApi.departments);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    firstGetWin();
  }, []);

  useEffect(() => {
    socket.on("refresh", getWin);
    return () => {
      socket.off("refresh", getWin);
    };
  }, [getWin]);

  // Split to two array, each containing half
  const halfLength = Math.ceil(windows.length / 2);
  const firstColumn = windows.slice(0, halfLength);
  const secondColumn = windows.slice(halfLength);

  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl">NOW SERVING</h1>
          <div className="w-[80%] max-h-screen overflow-hidden">
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
        </>
      )}
    </div>
  );
};

export default NowServing;
