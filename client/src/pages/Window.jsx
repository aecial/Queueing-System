import React from "react";
import socket from "../lib/socket";
import { useEffect, useState } from "react";

const Window = () => {
  const [ticketReceived, setTicketReceived] = useState([]);
  const [backData, setBackData] = useState([]);
  useEffect(() => {
    async function receiveTicket() {
      const response = await fetch("http://localhost:8080/tickets");
      const tickets = await response.json();
      setBackData(tickets.tickets);
    }
    receiveTicket();
  }, []);
  useEffect(() => {
    // function receiveTicket(number, name) {
    //   setTicketReceived((current) => [{ number, name }, ...current]);
    // }
    async function receiveTicket() {
      const response = await fetch("http://localhost:8080/tickets");
      const tickets = await response.json();
      setBackData(tickets.tickets);
    }
    // socket.on("receive_ticket", (data) => {
    //   receiveTicket(Number(data.number), String(data.name));
    // });
    socket.on("receive_ticket", () => {
      receiveTicket();
    });
    return () => {
      //   socket.off("receive_ticket", receiveTicket);
      socket.removeAllListeners("receive_ticket");
    };
  }, [backData]);
  const display_ticket = (name, number) => {
    socket.emit("display_ticket", { name, number });
    const btn = (document.getElementById(`${number}`).disabled = true);
  };
  const removeFromDb = (id) => {
    socket.emit("remove_ticket", { id });
  };
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5">
      <h1 className="text-4xl text-center">Window</h1>

      {/* {ticketReceived.map((ticket) => {
        return (
          <div className="flex gap-2 items-center" key={ticket.number}>
            <p>
              {ticket.number} - {ticket.name}
            </p>
            <button
              id={ticket.number}
              className="m-4 border border-white p-1 disabled:bg-white"
              onClick={() => display_ticket(ticket.name, ticket.number)}
            >
              DISPLAY
            </button>
            <button className="m-4 border border-white p-1">DONE</button>
          </div>
        );
      })} */}
      {backData.map((ticket) => {
        return (
          <div className="flex gap-2 items-center" key={ticket.id}>
            <p>
              {ticket.id} - {ticket.name} - {ticket.department.name}
            </p>
            <button
              id={ticket.id}
              className="m-4 border border-white p-1 disabled:bg-white"
              onClick={() => display_ticket(ticket.name, ticket.id)}
            >
              DISPLAY
            </button>
            <button
              className="m-4 border border-white p-1"
              onClick={() => removeFromDb(ticket.id)}
            >
              DONE
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Window;
