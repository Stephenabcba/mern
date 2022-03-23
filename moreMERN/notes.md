# All Additional MERN material past full CRUD
## Socket.io
```
npm install socket.io
```
- Web sockets allow the client to only call the server once, and the server will respond when there's new information
  - ex: chat apps
  - the connection / agreement is called a `handshake`
    - once the `handshake` is made, the client and server can send data to each other without makeing another HTTP request
  - otherwise, we have to constantly check with server every X seconds, which is very inefficient
- `Socket.io` is a package in node that builds on top of the Web Sockets API
  - save the return value of `app.listen()` and connect it to socket
  - `socket.on` will be an event listener that can handle events related to sockets
  - all communications are done through server
    - clients do not directly communicate with each other
  - commands:
    - `io.emit`: emits event to **all connected clients**
    - `socket.broadcast.emit`: emits event to all clients other than the socket referenced
      - can be used to send message to other clients
    - `socket.emit`: emites event directly to the referenced message
    ``` js
    // server.js
    const express = require('express');
    const app = express();
    
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
        socket.on("event_from_client", data => {
            socket.broadcast.emit("send_data_to_all_other_clients", data)
        })
    })
    ```
- Using Socket.io-client in React
    ```
    npm install socket.io-client
    ```
    ```js
    // in any React component that uses react
    import io from 'socket.io-client';
    ```
  - initialize the socket with `useState()`
  - all `event listeners` must be set up in `useEffect()`

    ``` js
    import React, { useState, useEffect } from 'react';
    import io from 'socket.io-client';
    import './App.css';
    
    function App() {
    // notice that we pass a callback function to initialize the socket
    // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
    const [socket] = useState(() => io(':8000'));
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        // we need to set up all of our event listeners
        // in the useEffect callback function
        console.log('Is this running?');
        socket.on('Welcome', data => 
        {
            console.log(data)
            // this syntax MUST be used for setting state for correct implementation
            setMessages(prevMessages=> {
                return [msg, ...prevMessages]
            })
        });
    
        // note that we're returning a callback function
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        return () => socket.disconnect(true);
    }, []);
    
    return (
        <div className="App">
        <h1>Socket Test</h1>
        </div>
    );
    }
    
    export default App;
    ```
- To keep chat scrolled to the bottom
  - height can be fine-tuned
    ```html
    <div className="scroll">
        <div>
            <!-- All chat content goes here -->
        </div>
    </div>
    ```
    ```css
    .scroll {
    overflow: auto;
    display:flex;
    flex-direction: column-reverse;
    height: 70vh;
    }
    ```
- Data flow for sending a message in chat app
  - Assumes that the client is connect to server through sockets already
  - Client A sends a message through form
    - in the form handler: 
      - `socket.emit` a message to the server
    ``` js
    // client form submit handler
    const sendMessage = (e) => {
        e.preventDefault()
        console.log(curMessage);
        socket.emit("message", { sender: userName, message: curMessage, senderId: socket.id })
        setCurMessage("")
    }
    ```
  - Server recieves the message
    - `io.emit` or `socket.broadcast.emit` the message to all other users
    ``` js
    // inside server io.on("connect") block
    socket.on("message", msg => {
        console.log(msg);
        messages.push(msg)
        io.emit("newMessage", msg)
    })
    ```
  - Depending on which `emit` is used, different clients will receive it
    - we can add the new message to the list of messages in state
    ``` js
    // inside useEffect() in client
    socket.on('newMessage', data => {
        console.log(data)
        // this syntax MUST be used for setting state for correct implementation
        setMessages(prevMessages => {
            return [...prevMessages, data]
        })
    });
    ```
- Rooms
  - A room is a channel that sockets can join
  - a socket can join many rooms (sockets and rooms are many-many relationship)
  - when the server `emit()` to a certain room, all recepients in the room will recieve the message
    - unless it was done with `socket.emit()` variant, then the specified socket (the sender) will not recieve the message
  - <a href="https://socket.io/docs/v4/rooms/">Socket.io Documentation</a>
- <a href="https://socket.io/docs/v4/emit-cheatsheet/">Socket.io cheatsheet</a>