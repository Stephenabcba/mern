// server.js
const express = require('express');
const app = express();
const messages = []

const server = app.listen(8000, () =>
    console.log('The server is all fired up on port 8000')
);

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

io.on("connection", socket => {
    console.log(socket.id, "has Connected")
    socket.emit("Welcome", "Welcome to the chat app!")
    messages.forEach((message) => {
        socket.emit("newMessage", message)
    })
    socket.on("event_from_client", data => {
        socket.broadcast.emit("send_data_to_all_other_clients", data)
    })
    socket.on("message", msg => {
        console.log(msg);
        messages.push(msg)
        io.emit("newMessage", msg)
    })
})