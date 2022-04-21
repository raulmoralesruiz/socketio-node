const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {},
});

// --------------------------------------------------

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  const idHandshake = socket.id;
  const clientIp = socket.client.conn.remoteAddress;
  console.log(`----->Client connected: ${idHandshake}`);

  socket.send("server msg");

  socket.on("disconnect", (reason) => {
    console.log(`<--Client disconnected: ${idHandshake}`);
    console.log(reason);
  });

  socket.on("my message", (msg) => {
    console.log(`message from ${idHandshake} ${clientIp}: ` + msg);
  });

  socket.on("my message", (msg) => {
    io.emit("my broadcast", `server: ${msg}`);
  });

  socket.on("btn lonely message", (msg) => {
    console.log(`message from ${idHandshake} ${clientIp}: ` + msg);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
