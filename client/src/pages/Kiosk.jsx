import React, { useState } from "react";
import socket from "../lib/socket";
const Kiosk = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const sendTicket = () => {
    // alert(`${name} - ${number}`);
    socket.emit("create_ticket", { name, number });
    setName("");
    setNumber(0);
  };
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5">
      <h1 className="text-4xl text-center">Kiosk</h1>
      <label htmlFor="name">Name : </label>
      <input
        type="text"
        name="name"
        id="name"
        className="text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="number">Number : </label>
      <input
        type="number"
        name="number"
        id="number"
        className="text-black"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={sendTicket} className="m-4 border border-white p-1">
        Submit
      </button>
    </div>
  );
};

export default Kiosk;
