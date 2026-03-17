const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const tasksRoutes = require("./routes/tasks");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/tasks", tasksRoutes);

// make io available to routes/controllers
app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server Running on port 3000");
});
