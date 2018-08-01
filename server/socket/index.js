const socketIo = require("socket.io");
const jwtAuth = require("socketio-jwt-auth");

const socketAuth = require("../helpers/socketAuth");
const { User, Message } = require("../models");

module.exports = server => {
  const io = socketIo(server);

  // if user is not verified - socket emit error message
  io.use(jwtAuth.authenticate({ secret: "spiderman" }, socketAuth));

  // socket routes
  io.sockets.on("connection", socket => {
    socket.emit("success", { msg: "success!" });
    console.log("user connected");

    socket.on("room:join", async function(room) {
      socket.join(room.name);
      console.log(`user ${socket.request.user.username} join to ${room.name}`);

      const messages = await Message.findAll({
        where: { room_id: room.id },
        include: {
          model: User,
          as: "user",
          attributes: ["id", "username", "screenname", "avatar"],
        },
      });
      socket.emit("messages:history", messages);
    });

    socket.on("room:leave", function(room) {
      socket.leave(room.name);
      console.log(`user ${socket.request.user.username} leave ${room.name}`);
    });

    socket.on("disconnect", () => {
      console.log("disconnected !!!");
    });
  });
};
