const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Eyy");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("create_ticket", (data) => {
    console.log(`${data.name} - ${data.number}`);
    io.emit("receive_ticket", data);
  });
  socket.on("display_ticket", (data) => {
    console.log(`${data.name} - ${data.number}`);
    io.emit("project_ticket", data);
  });
});

server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
