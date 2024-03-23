import React from "react";
import socket from "../lib/socket";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Window = () => {
  const { department } = useParams();
  const [ticketReceived, setTicketReceived] = useState([]);
  const [backData, setBackData] = useState([]);
  const [departments, setDepartments] = useState([]);
  async function getDepartments() {
    const response = await fetch(`http://localhost:8080/departments`);
    const departments = await response.json();
    setDepartments(departments.departments);
  }
  useEffect(() => {
    getDepartments();
  }, []);
  async function receiveTicket() {
    const response = await fetch(`http://localhost:8080/tickets/${department}`);
    const tickets = await response.json();
    setBackData(tickets.tickets);
  }

  useEffect(() => {
    receiveTicket();
  }, []);
  useEffect(() => {
    socket.on("receive_ticket", () => {
      receiveTicket();
    });
    return () => {
      //   socket.off("receive_ticket", receiveTicket);
      socket.removeAllListeners("receive_ticket");
    };
  }, [backData]);
  const display_ticket = (name, number) => {
    console.log(department ? department : "nom");
    socket.emit("display_ticket", { name, number, department });
    const btn = document.getElementById(`${number}`);
    btn.remove();
    const done = document.getElementById(`${number}btn`);
    done.classList.remove("hidden");
  };
  const removeFromDb = (id) => {
    socket.emit("remove_ticket", { id });
    receiveTicket();
  };
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5">
      <h1 className="text-4xl text-center">
        {departments.map((item) => {
          if (item.id == department) {
            return <p>{item.name}</p>;
          }
        })}
        Window
      </h1>
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
              className="m-4 border border-white p-1 hidden"
              id={ticket.id + "btn"}
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
