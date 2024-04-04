import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
const Test = () => {
  const socket = io.connect("http://localhost:8080");
  const [now, setNow] = useState({});
  const [testItems, setTestItems] = useState([
    // { id: 1, name: "Ted" },
    // { id: 2, name: "Mau" },
    // { id: 3, name: "Tiny" },
  ]);
  const { department } = useParams();
  function joinRoom() {
    socket.emit("join_room", department);
  }
  useEffect(() => {
    joinRoom();
  }, []);
  async function receiveTicket() {
    const response = await fetch(`http://localhost:8080/tickets/1`);
    const tickets = await response.json();
    setTestItems(tickets.tickets);
  }
  useEffect(() => {
    receiveTicket();
  }, []);
  useEffect(() => {
    socket.on("receive_ticket", () => {
      receiveTicket();
    });
    return () => {
      socket.removeAllListeners("receive_ticket");
    };
  }, []);
  const handleClick = () => {
    if (testItems.length === 0) {
      setNow({});
      socket.emit("display_ticket", {
        name: null,
        number: null,
        department: "1",
      });
    } else {
      setNow(testItems[0]);
      socket.emit("display_ticket", {
        name: testItems[0].name,
        number: testItems[0].id,
        department: "1",
      });
      socket.emit("remove_ticket", { id: testItems[0].id });
      socket.removeAllListeners("remove_ticket");
      setTestItems((prevItems) => prevItems.slice(1));
    }
  };
  return (
    <div className="bg-gray-800 min-h-screen text-white text-4xl">
      <div className="h-24 hidden">
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
          <p>
            {item.id} - {item.name}
          </p>
        );
      })}
      <button onClick={handleClick} className="border border-white p-1 w-full ">
        {testItems.length === 0 && Object.keys(now).length === 0
          ? "No Tickets Yet"
          : "Next"}
      </button>
    </div>
  );
};

export default Test;
