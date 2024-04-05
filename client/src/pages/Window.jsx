import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
const Window = () => {
  const { department } = useParams();
  const socket = io.connect("http://localhost:8080");
  const [departments, setDepartments] = useState([]);
  const [now, setNow] = useState({});

  async function getDepartments() {
    const response = await fetch(`http://localhost:8080/departments`);
    const departments = await response.json();
    setDepartments(departments.departments);
  }
  useEffect(() => {
    getDepartments();
  }, []);
  const [testItems, setTestItems] = useState([]);
  function joinRoom() {
    socket.emit("join_room", department);
  }
  useEffect(() => {
    joinRoom();
  }, []);
  async function receiveTicket() {
    const response = await fetch(`http://localhost:8080/tickets/${department}`);
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
        department,
      });
      return socket.removeAllListeners("display_ticket");
    } else {
      setNow(testItems[0]);
      socket.emit("display_ticket", {
        name: testItems[0].name,
        number: testItems[0].id,
        department,
      });
      socket.emit("remove_ticket", { id: testItems[0].id });
      setTestItems((prevItems) => prevItems.slice(1));
    }
  };
  return (
    <div className="bg-gray-800 min-h-screen text-white text-4xl">
      <h1 className="text-4xl text-center">
        {departments.map((item) => {
          if (item.id == department) {
            return <p>{item.name}</p>;
          }
        })}
        Window
      </h1>
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

export default Window;
