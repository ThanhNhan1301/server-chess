const { resolve } = require("path");

const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connect::: ", socket.id)
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.on("disconnect", () => {
    console.log("disconnect ::: ", socket.id);
  });
});

app.use((req, _, next) => {
  req.io = io;
  next();
});

app.get("/", async ({io}, res) => {
  io.sockets.emit("Hello")
  res.status(200).json("Ok");
});

server.listen(3000);
