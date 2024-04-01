const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const prisma = require("./lib/PrismaProvider");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Eyy");
});
app.get("/tickets", async (req, res) => {
  const tickets = await prisma.tickets.findMany({
    // orderBy: {
    //   id: "desc",
    // },
    include: {
      department: true,
    },
  });
  res.json({ tickets });
});
app.get("/tickets/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tickets = await prisma.tickets.findMany({
    // orderBy: {
    //   id: "desc",
    // },
    include: {
      department: true,
    },
    where: {
      departmentId: id,
    },
  });
  res.json({ tickets });
});
// TESTING
app.get("/test/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tickets = await prisma.tickets.findMany({
    // orderBy: {
    //   id: "desc",
    // },
    include: {
      department: true,
    },
    where: {
      departmentId: id,
    },
  });
  res.json({ tickets });
});
// TESTING
app.get("/departments", async (req, res) => {
  const departments = await prisma.department.findMany();
  res.json({ departments });
});
io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("create_ticket", (information) => {
    async function createTicket(name, department) {
      const ticket = await prisma.tickets.create({
        data: {
          name: name,
          departmentId: department,
        },
      });
      console.log(ticket);
    }
    createTicket(information.name, information.department);
    console.log(`New ticket created created`);
    io.emit("receive_ticket");
  });
  socket.on("display_ticket", (data) => {
    console.log(`${data.name} - ${data.number} - ${data.department}`);
    socket.to(String(data.department)).emit("project_ticket", data);
  });
  socket.on("remove_ticket", (information) => {
    async function removeTicket(id) {
      const ticket = await prisma.tickets.delete({
        where: {
          id: id,
        },
      });
      console.log(ticket);
    }
    removeTicket(information.id);
    console.log(`#${information.id} removed`);
    io.emit("receive_ticket");
  });
});

server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
