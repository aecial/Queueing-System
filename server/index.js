const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const prisma = require("./lib/PrismaProvider");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Eyy");
});
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hash = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hash,
      },
    });

    // Send a single response to the client after user creation
    res.json({ message: "Added New User" });
  } catch (error) {
    console.error("Error registering user:", error);
    // Send a single error response to the client if an error occurs
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id }, "1223", {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.sendStatus(403); // Incorrect password
    }
  } else {
    res.sendStatus(403); // User not found
  }
});
app.post("/api/verifyToken", async (req, res) => {
  const token = req.body.token; // Assuming the token is sent in the request body

  if (!token) {
    return res.status(400).json({ error: "Token is missing." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "1223");

    // Token is valid, you can perform further checks here if needed
    res.status(200).json({ token });
  } catch (error) {
    // Token verification failed
    res.status(401).json({ error: "Invalid token." });
  }
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
  const months =
    await prisma.$queryRaw`SELECT DISTINCT MONTH(createdAt) AS month
  FROM service WHERE departmentId = ${id};`;
  res.json({ since, reportCount, reportAverage, months });
});
app.get("/api/report/:id/:month", async (req, res) => {
  const id = Number(req.params.id);
  const month = Number(req.params.month);
  const since = await prisma.$queryRaw`
  SELECT *
  FROM service
  WHERE departmentId = ${id}
  AND MONTH(createdAt) = ${month} ORDER BY id ASC LIMIT 1
`;
  // Query to count the number of entries for the specified month
  const reportCount = await prisma.service.count({
    where: {
      departmentId: id,
      createdAt: {
        gte: new Date(`${new Date().getFullYear()}-${month}-01`),
        lt: new Date(`${new Date().getFullYear()}-${month + 1}-01`),
      },
    },
  });
  const reportAverage = await prisma.service.aggregate({
    where: {
      departmentId: id,
      createdAt: {
        gte: new Date(`${new Date().getFullYear()}-${month}-01`),
        lt: new Date(`${new Date().getFullYear()}-${month + 1}-01`),
      },
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
app.get("/api/department/:id", async (req, res) => {
  const id = Number(req.params.id);
  const dept = await prisma.department.findFirst({
    where: {
      id: id,
    },
    include: {
      office: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json({ dept });
});
app.get("/api/departments", async (req, res) => {
  const departments = await prisma.department.findMany({
    include: {
      office: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json({ departments });
});
app.get("/api/department/:id", async (req, res) => {
  const id = Number(req.params.id);
  const department = await prisma.department.findMany();
  res.json({ department });
});
app.get("/api/offices", async (req, res) => {
  const offices = await prisma.office.findMany({
    include: {
      department: true,
    },
  });
  res.json({ offices });
});
app.get("/api/office/:id", async (req, res) => {
  const id = Number(req.params.id);
  const office = await prisma.office.findFirst({
    where: {
      id,
    },
  });
  res.json({ office });
});

app.post("/api/addDepartment", async (req, res) => {
  const { office, name, description } = req.body;
  const department = await prisma.department.create({
    data: {
      name: name,
      now_serving: "",
      description,
      officeId: Number(office),
    },
  });
  res.json({
    message: `Added a new window: Window ${name} - Service: ${description} in ${office}`,
  });
});
app.post("/api/editWindow", async (req, res) => {
  const { id, name, description } = req.body;
  try {
    const window = await prisma.department.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        description: description,
      },
    });
    res.json({
      message: `Updated Window ${id}: ${name} ${description}`,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});
app.post("/api/deleteWindow", async (req, res) => {
  const { id } = req.body;

  try {
    const window = await prisma.department.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: `Successfully Deleted Window ${id}` });
  } catch (error) {
    console.log(error);
  }
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
    try {
      async function createTicket(name, department) {
        const ticket = await prisma.tickets.create({
          data: {
            name: name,
            departmentId: department,
          },
        });
        console.log(ticket);
        socket.emit("response", {
          id: ticket.id,
          name: ticket.name,
          departmentId: ticket.departmentId,
        });
      }
      createTicket(information.name, information.department);

      console.log(`New ticket created created`);
      io.emit("receive_ticket");
    } catch (error) {
      console.error("Error handling create_ticket", error);
    }
  });
  socket.on("transfer_ticket", (information) => {
    try {
      async function createTicket(name, department) {
        const ticket = await prisma.tickets.create({
          data: {
            name: name,
            departmentId: department,
          },
        });
        console.log(ticket);
      }
      createTicket(information.ticket, information.transferId);

      console.log(
        `Tranfered ${information.ticket} Ticket to ${information.transferId}`
      );
      io.emit("receive_ticket");
    } catch (error) {
      console.error("Error handling create_ticket", error);
    }
    console.log(information);
  });
  socket.on("display_ticket", (data) => {
    console.log(`${data.name} - ${data.number} - ${data.department}`);
    socket.to(data.department).emit("project_ticket", data);
  });
  socket.on("display_unified_ticket", (data) => {
    console.log(data);
    console.log("display unified ticket");
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
    console.log("Ticket Updated");
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

  socket.on("disconnect", (error) => {
    if (error && error.code === "ECONNRESET") {
      // Handle ECONNRESET error specifically
      console.error(`${socket.id} disconnected due to ECONNRESET`);
      // Perform any necessary cleanup or logging
    } else {
      // Handle other disconnection errors or scenarios
      console.error(`${socket.id} disconnected with error:`, error);
      // Perform appropriate error handling or cleanup
    }
  });
});
server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
