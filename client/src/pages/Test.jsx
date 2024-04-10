import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const Test = () => {
  const { department } = useParams();
  const [socket, setSocket] = useState(null);
  const [now, setNow] = useState({});
  const [testItems, setTestItems] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
    const newSocket = io.connect("http://localhost:8080");
    setSocket(newSocket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);
  const receiveTicket = async () => {
    try {
      const response = await fetch(`/api/tickets/1`);
      const tickets = await response.json();
      setTestItems(tickets.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    receiveTicket();
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
        socket.emit("display_ticket", {
          name: null,
          number: null,
          department: "1",
        });
      }
      setElapsedTime(0);
      return;
    } else {
      setNow(testItems[0]);
      if (socket) {
        socket.emit("display_ticket", {
          name: testItems[0].name,
          number: testItems[0].id,
          department: "1",
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
      <div className="h-24">
        NOW SERVING
        {now !== null || {} ? (
          <p>
            {now.id} - {now.name}
          </p>
        ) : (
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
          className="border border-white p-1 w-full "
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
      <p>Elapsed Time: {elapsedTime} seconds</p>
    </div>
  );
};

export default Test;
