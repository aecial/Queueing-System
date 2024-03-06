import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:8080");
function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState(null);
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    joinRoom();
    socket.emit("send_message", { message, room });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl text-center">
        Websocket Practice with React and Express
      </h1>
      <input
        className="text-black block mb-3"
        type="number"
        placeholder="Room Number"
        onChange={(e) => setRoom(e.target.value)}
      />
      <input
        className="text-black block mb-3"
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="ml-4 border border-white p-1">
        Send Message
      </button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
