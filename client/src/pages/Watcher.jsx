import socket from "../lib/socket";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Watcher = () => {
  const { department } = useParams();
  function joinRoom() {
    socket.emit("join_room", department);
  }
  useEffect(() => {
    joinRoom();
  }, []);
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
      <h1 className="text-4xl text-center">Watcher {department}</h1>

      <h1 className="text-2xl">NOW SERVING :</h1>
      <p className="text-lg">
        {number} - {name}
      </p>
    </div>
  );
};

export default Watcher;
