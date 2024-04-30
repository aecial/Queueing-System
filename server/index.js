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

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Eyy");
});
app.get("/api/tickets", async (req, res) => {
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
app.get("/api/tickets/:id", async (req, res) => {
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
app.get("/api/report", async (req, res) => {
  const since = await prisma.service.findFirst();
  const reportCount = await prisma.service.count();
  const reportAverage = await prisma.service.aggregate({
    _avg: {
      service_time: true,
    },
  });
  res.json({ since, reportCount, reportAverage });
});
app.get("/api/report/:id", async (req, res) => {
  const id = Number(req.params.id);
  const since = await prisma.service.findFirst({
    where: {
      departmentId: id,
    },
  });
  const reportCount = await prisma.service.count({
    where: {
      departmentId: id,
    },
  });
  const reportAverage = await prisma.service.aggregate({
    where: {
      departmentId: id,
    },
    _avg: {
      service_time: true,
    },
  });
  res.json({ since, reportCount, reportAverage });
});
app.get("/api/test/:id", async (req, res) => {
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
app.get("/api/departments", async (req, res) => {
  const departments = await prisma.department.findMany();
  res.json({ departments });
});

app.post("/api/addDepartment", async (req, res) => {
  const { name } = req.body;
  const department = await prisma.department.create({
    data: {
      name: name,
    },
  });
  console.log("ey1");
  res.json({ message: `Added a new department: ${name}` });
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
      socket.emit("response", { id: ticket.id, name: ticket.name });
    }
    createTicket(information.name, information.department);

    console.log(`New ticket created created`);
    io.emit("receive_ticket");
  });
  socket.on("display_ticket", (data) => {
    console.log(`${data.name} - ${data.number} - ${data.department}`);
    socket.to(data.department).emit("project_ticket", data);
  });
  socket.on("display_unified_ticket", (data) => {
    console.log(data);
    async function updateTicket(name, id, department) {
      const ticket = await prisma.department.update({
        where: {
          id: Number(department),
        },
        data: {
          now_serving: `${id} - ${name}`,
        },
      });
      console.log(ticket);
      io.emit("refresh");
    }
    updateTicket(data.name, data.number, data.department);
  });
  socket.on("remove_ticket", (information) => {
    async function removeTicket(id) {
      const ticket = await prisma.tickets.delete({
        where: {
          id: Number(id),
        },
      });
      console.log(ticket);
    }
    removeTicket(information.id);
    console.log(`#${information.id} removed`);
    io.emit("receive_ticket");
  });
  socket.on("remove_unified_ticket", (information) => {
    async function removeNowServing(department) {
      const ticket = await prisma.department.update({
        where: {
          id: Number(department),
        },
        data: {
          now_serving: "",
        },
      });
      console.log(ticket);
    }
    removeNowServing(information.department);
    io.emit("refresh");
  });
  socket.on("add_time", (information) => {
    async function createTime(time, department) {
      const service = await prisma.service.create({
        data: {
          service_time: Number(time),
          departmentId: Number(department),
        },
      });
      console.log(service);
    }
    createTime(information.time, information.department);
    console.log(`New Time created`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);

    // Remove the disconnected socket from all rooms it joined
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      socket.leave(room);
    });
  });
});
server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
