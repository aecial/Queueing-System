import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Test = () => {
  const socket = io.connect("http://localhost:8080");
  const [now, setNow] = useState({});
  const [testItems, setTestItems] = useState([
    // { id: 1, name: "Ted" },
    // { id: 2, name: "Mau" },
    // { id: 3, name: "Tiny" },
  ]);
  async function receiveTicket() {
    const response = await fetch(`http://localhost:8080/tickets/1`);
    const tickets = await response.json();
    setTestItems(tickets.tickets);
  }
  useEffect(() => {
    receiveTicket();
  }, []);
  const handleClick = () => {
    if (testItems.length === 0) {
      setNow({});
    } else {
      setNow(testItems[0]);
      console.log(testItems[0].id);
      socket.emit("remove_ticket", { id: testItems[0].id });
      setTestItems((prevItems) => prevItems.slice(1));
    }
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
