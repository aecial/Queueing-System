import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Window2 = () => {
  const { department } = useParams();
  const [socket, setSocket] = useState(null);
  const [now, setNow] = useState({});
  const [testItems, setTestItems] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
    const newSocket = io.connect("http://localhost:8080");
    setSocket(newSocket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);
  const firstReceiveTicket = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tickets/${department}`);
      const tickets = await response.json();
      setTestItems(tickets.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const receiveTicket = async () => {
    try {
      const response = await fetch(`/api/tickets/${department}`);
      const tickets = await response.json();
      setTestItems(tickets.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    firstReceiveTicket();
  }, []);
  useEffect(() => {
    if (socket) {
      // Join room
      socket.emit("join_room", department);

      // Listen for ticket updates
      socket.on("receive_ticket", () => {
        receiveTicket();
      });

      // Clean up event listener
      return () => {
        socket.removeAllListeners("receive_ticket");
      };
    }
  }, [socket, department]);
  function addTime(time) {
    console.log(time);
    socket.emit("add_time", { time, department });
  }
  const handleClick = () => {
    if (testItems.length === 0) {
      logTime(); // Log time before reset
      setNow({});
      if (socket) {
        socket.emit("display_unified_ticket", {
          name: null,
          number: null,
          department,
        });
        socket.emit("remove_unified_ticket", { department });
      }
      setElapsedTime(0);
      return;
    } else {
      setNow(testItems[0]);
      if (socket) {
        socket.emit("display_unified_ticket", {
          name: testItems[0].name,
          number: testItems[0].id,
          department,
        });
      }
      socket.emit("remove_ticket", { id: testItems[0].id });
      setTestItems((prevItems) => prevItems.slice(1));
      logTime();
      startTimer(); // Start the timer
    }
  };

  const startTimer = () => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      setElapsedTime(elapsedTime.toFixed(2));
    }, 10);
    setTimer(interval);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const logTime = () => {
    if (elapsedTime === 0) {
      return;
    }
    console.log("Elapsed Time:", elapsedTime, "seconds");
    addTime(elapsedTime);
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white text-4xl">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="h-auto mb-10">
            NOW SERVING
            {now !== null || {} ? (
              <div className="card w-96 bg-base-100 shadow-xl image-full block mx-auto">
                <figure>
                  <img
                    src="https://images.pexels.com/photos/7232830/pexels-photo-7232830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body text-white">
                  <h2 className="card-title text-red-500">
                    # <span className="underline">{now.id}</span>
                  </h2>
                  <p className="text-center text-white">{now.name}</p>
                </div>
              </div>
            ) : (
              // <p>
              //   {now.id} - {now.name}
              // </p>
              <span></span>
            )}
          </div>
          {testItems.map((item) => {
            return (
              <p key={item.id}>
                {item.id} - {item.name}
              </p>
            );
          })}
          {testItems.length === 0 && Object.keys(now).length === 0 ? (
            <button
              onClick={handleClick}
              className="border border-white p-1 w-full disabled:bg-red-600 "
              disabled
            >
              No Tickets Yet
            </button>
          ) : (
            <button
              onClick={() => {
                stopTimer();
                handleClick();
              }}
              className="btn btn-primary w-full"
            >
              {Object.keys(now).length === 0
                ? "Start"
                : testItems.length === 0 && Object.keys(now).length === 0
                ? "No Tickets Yet"
                : testItems.length === 0
                ? "Done"
                : "Next"}
            </button>
          )}
          <p className="hidden">Elapsed Time: {elapsedTime} seconds</p>
        </div>
      )}
    </div>
  );
};

export default Window2;
