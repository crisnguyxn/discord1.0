const express = require("express");
const connectDB = require("./src/db/connect");
const authRouter = require("./src/routes/authen");
const jobsRouter = require("./src/routes/jobs");
const handleErrMiddlewares = require("./src/middlewares/handle-error");
const cookieParser = require("cookie-parser");
const roomRouter = require("./src/routes/room");
const cors = require("cors");
const app = express();
const discordRouter = require("./src/routes/discord-room");
require("dotenv").config();

//setup socket
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {
  cors: {
    credentials:true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on('send message',msg => {
    io.emit('send message',msg)
  })
});

//end socket

//middlewares
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
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
app.use("/api/v1/discord-rooms", discordRouter);
app.use(handleErrMiddlewares);

start();
