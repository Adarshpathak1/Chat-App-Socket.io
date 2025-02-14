const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const app = express();
const socket = require("socket.io");
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoute)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongodb connected successfully");
}).catch((err) => {
    console.log(err.message);
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

// Global variables and socket handling

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log("New client connected with id:", socket.id);
    
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        // console.log(`User added: ${userId}, socket id: ${socket.id}`);
    });

    socket.on("send-msg", (data) => {
        // console.log("Message sent:", data);
        const sendUserSocket = onlineUsers.get(data.to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        } else {
            console.log("Receiver socket not found");
        }

    })
    socket.on("disconnect", () => {
        console.log("client disconnected",socket.id)
    })
})