import React from "react";
import socket from "../lib/socket";
import { useEffect, useState } from "react";

const Window = () => {
  const [ticketReceived, setTicketReceived] = useState([]);
  useEffect(() => {
    function receiveTicket(number, name) {
      setTicketReceived((current) => [{ number, name }, ...current]);
    }
    socket.on("receive_ticket", (data) => {
      receiveTicket(Number(data.number), String(data.name));
    });
    return () => {
      //   socket.off("receive_ticket", receiveTicket);
      socket.removeAllListeners("receive_ticket");
    };
  }, []);
  const display_ticket = (name, number) => {
    socket.emit("display_ticket", { name, number });
  };
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5">
      <h1 className="text-4xl text-center">Window</h1>

      {ticketReceived.map((ticket) => {
        return (
          <div className="flex gap-2 items-center" key={ticket.number}>
            <p>
              {ticket.number} - {ticket.name}
            </p>
            <button
              className="m-4 border border-white p-1"
              onClick={() => display_ticket(ticket.name, ticket.number)}
            >
              DISPLAY
            </button>
            <button className="m-4 border border-white p-1">DONE</button>
          </div>
        );
      })}
    </div>
  );
};

export default Window;
