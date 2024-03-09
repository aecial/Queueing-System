import socket from "../lib/socket";
import { useEffect, useState } from "react";
const Watcher = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  useEffect(() => {
    function projectTicket(number, name) {
      setName(name);
      setNumber(number);
    }
    socket.on("project_ticket", (data) => {
      projectTicket(Number(data.number), String(data.name));
    });
    return () => {
      socket.removeAllListeners("project_ticket");
    };
  }, [name]);
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5">
      <h1 className="text-4xl text-center">Watcher</h1>

      <h1 className="text-2xl">NOW SERVING :</h1>
      <p className="text-lg">
        {number} - {name}
      </p>
    </div>
  );
};

export default Watcher;
