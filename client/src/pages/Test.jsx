import React from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8080");
const Test = () => {
  return <div>Test</div>;
};

export default Test;
