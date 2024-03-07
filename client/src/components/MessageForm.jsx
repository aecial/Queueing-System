import { io } from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:8080");
const MessageForm = ({ room }) => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    setMessage("");
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  useEffect(() => {
    joinRoom();
  }, []);
  useEffect(() => {
    function receiveMessage(value) {
      setMessageReceived((current) => [value, ...current]);
    }
    socket.on("receive_message", (data) => {
      receiveMessage(data.message);
    });
    return () => {
      socket.off("receive_message", receiveMessage());
    };
  }, [messageReceived]);
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl text-center">
        Websocket Practice with React and Express
      </h1>
      <input
        className="text-black block mb-3"
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="ml-4 border border-white p-1">
        Send Message
      </button>
      <h1>Message:</h1>
      {messageReceived.map((message) => {
        return <p>{message}</p>;
      })}
    </div>
  );
};

export default MessageForm;
