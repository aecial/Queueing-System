import React, { useEffect, useState } from "react";

import socket from "../lib/socket";
import Loader from "../components/Loader";
import OfficeCard from "../components/OfficeCard";

const NowServing = () => {
  const [offices, setOffices] = useState([]);
  const [windows, setWindows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getWin = async () => {
    const response = await fetch(`/api/offices`);
    const windowApi = await response.json();
    setOffices(windowApi.offices);
    playSound();
  };
  const getWinRemove = async () => {
    const response = await fetch(`/api/offices`);
    const windowApi = await response.json();
    setOffices(windowApi.offices);
  };
  const playSound = () => {
    const audio = new Audio("/ting.mp3"); // Adjust the path to your sound file
    audio.play();
  };
  const firstGetWin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/offices`);
      const windowApi = await response.json();
      setOffices(windowApi.offices);
      console.log(offices);
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
  useEffect(() => {
    socket.on("refreshRemove", getWinRemove);
    return () => {
      socket.off("refreshRemove", getWinRemove);
    };
  }, [getWinRemove]);

  // Split to two array, each containing half
  // const halfLength = Math.ceil(windows.length / 2);
  // const firstColumn = windows.slice(0, halfLength);
  // const secondColumn = windows.slice(halfLength);

  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl ">NOW SERVING</h1>
          <div className="divider"></div>
          <div className="w-[80%] max-h-screen overflow-hidden">
            <div className="grid grid-cols-3 w-auto gap-x-7 gap-y-5 text-center">
              {offices.map((data) => {
                return <OfficeCard data={data} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NowServing;
