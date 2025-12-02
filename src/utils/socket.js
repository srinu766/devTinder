const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetedUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetedUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173" || "http://localhost:5174",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetedUserId }) => {
      const roomId = getSecretRoomId(userId, targetedUserId);

      console.log(firstName + " joining roomId", roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetedUserId, text }) => {
        // const roomId = [userId, targetedUserId].sort().join("_")

        // save to database

        try {
          const roomId = getSecretRoomId(userId, targetedUserId);
          console.log("firstName", firstName, "text", text);

          ConnectionRequest.findOne({fromuUserId:userId, toUserId:targetedUserId, status:"accepted"},
            {})

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetedUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetedUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("messageReceived", { firstName, lastName, text });
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", (data) => {});
  });
};

module.exports = initializeSocket;
