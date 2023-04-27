const express = require("express");
const connectDB = require("./src/db/connect");
const authRouter = require("./src/routes/authen");
const jobsRouter = require("./src/routes/jobs");
const handleErrMiddlewares = require("./src/middlewares/handle-error");
const roomRouter = require("./src/routes/room");
const cors = require("cors");
const app = express();
const discordRouter = require("./src/routes/discord-room");
const bodyParser = require("body-parser");
require("dotenv").config();
//setup socket
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  path: "/text-channels/",
  cors: {
    credentials: true,
    origin: ["http://localhost:8080","http://localhost:3000","http://localhost:3050"],
    methods: ["GET", "POST"],
  },
});


//setup multer middleware
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/src/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName + "-" + Date.now());
  },
});

const upload = multer({ storage: storage }) 


io.on("connection", (socket) => {
  socket.on("join room", (rNo) => {
    socket.join(rNo);
  });

  socket.on("send message", (rNo, msg) => {
    io.in(rNo).emit("send", msg);
  });

  socket.on("leave room", (username,id) => {
    socket.leave(id);
    socket
      .to(id)
      .emit("leave",username,id);
  });

  socket.on("addUser",(rId,userId,username) => {
    io.emit("user",rId,userId,username)
  })
});

//end socket

//middlewares
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const port = 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/discord-rooms", upload.array("files",12), discordRouter);
app.use(handleErrMiddlewares);

start();
