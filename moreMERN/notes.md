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

## MERN Authentication
- Login & Registration
- Authentication & Authorization
  - Authentication is ensuring that the user logged in is who they claim to be
    - can be done by checking the userName password pair the user entered when logging in
  - Authorization is determining whether the user has the permission to perform the operation
    - ex: a social media user cannot edit the content/information of another user
- User Model & BCrypt
  - the user model is built on other basic models
    - contains 4 string fields: first name, last name, email, and password
    - all fields are required, which is done with built-in mongoose validation
  - additional logic:
    - check the email format with a custom `validate` object
      - the `validator` key is the callback function
        - in this case, the callback checks with regex
        - the callback should return true if valid
      - the `message` key is the message to show if the validator function returned false (validation failed)
    - although we need confirm password as part of the input, it is not saved in the database
      - instead, it is temporarily stored as a `mongoose virtual`
    - to check password against confirm password, we use a middleware called `pre hook`
      - this pre hook is run before validating (as specified by the first parameter)
      - the check is done before all other validations are done
      - `next()` is called when the middleware done, so that the other operations can continue as normal
      - this callback function cannot be re-written as an arrow function, as `this` will refer to the wrong target
    - the password will not be saved as plain text inside the database
      - instead, it is hashed using `BCrypt` 
        - as usual, hashing is done multiple times using a `salt` for better security
        ```
        npm install bcrypt
        ```
      - the hashing operation is done inside another `pre hook` before saving
      - the hashing function is a `Promise`, and thus needs to be handled asynchronously
    ```js
    // user.model.js
    // import bcrypt for password encryption/hashing
    const bcrypt = require('bcrypt');

    const UserSchema = new mongoose.Schema({
      firstName: {
        type: String,
        required: [true, "First name is required"]
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"]
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
          validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
          message: "Please enter a valid email"
        }
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
      }
    }, {timestamps: true});

    // create mongoose virtual for confirm password
    UserSchema.virtual('confirmPassword')
      .get( () => this._confirmPassword )
      .set( value => this._confirmPassword = value );

    // use pre hook to compare password against confirm password
    UserSchema.pre('validate', function(next) {
      if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
      }
      next();
    });

    UserSchema.pre('save', function(next) {
      bcrypt.hash(this.password, 10)
        .then(hash => {
          this.password = hash;
          next();
        });
    });
    ```
- Registration
  - Make a registration form in the front end (React)
    - when the form is submitted, send an API post request to the express server
  - Process the post request in the back end (express)
    - the submitted form is treated like a normal create logic in the controller and route
    - the extra schema logic will handle validations and hashing
    ```js
    // user.controller.js
    // this example places all functions as key-value pairs inside the module.exports object
    // ...
    register: (req, res) => {
      User.create(req.body)
        .then(user => {
            res.json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
    }
    // ...
    ```
- Evnironmental Variables
  - sometimes, we need to store some values secretly, such as api keys
  - the secret values can be passed in when running the server
    ```
    SECRET_KEY="my very secret key" node server.js
    ```
  - the better way is to use a file-based approach
    - we need the `dotenv` package for this
    ```
    npm install dotenv
    ```
    - create a `.env` file on the same level as `server.js`
    - remember to add the file to `.gitignore`
      - the secret keys should not be shared with the public
    - set the variables inside `.env`
    ```
    FIRST_SECRET_KEY="first key value"
    SECOND_SECRET_KEY="second key value"
    ```
    - import the environmental variables in `server.js`
    ``` js
    // server.js
    require('dotenv').config();
    ```
    - the secret values can now be accessed anywhere in the Express server
    ``` js
    // anywhere in the backend that requires this secret key value
    const myFirstSecret = process.env.FIRST_SECRET_KEY;
    ```
- JSON Web Tokens (JWTs)
  - a structured way to keep data secure and make sure that the data has not been tampered with
  - can be used to keep track of who is logged in
  - three parts:
    - header
      - holds data about the JWT itself
    - body
      - stores the information
    - signature
      - signs the JWT
  - creating a JWT
    - we need the `jsonwebtoken` package
    - create a payload object, and sign it using `jwt.sign()`
      - the first argument is the payload
      - the second is the secret key saved in `.env`
    ```
    npm install jsonwebtoken
    ```
    ``` js
    const jwt = require("jsonwebtoken");

    const payload = {
      id: user._id
    };
    
    // notice that we're using the SECRET_KEY from our .env file
    const userToken = jwt.sign(payload, process.env.SECRET_KEY);
    ```
- Cookies
  - HTTP cookies are a way to send information between server and client
    - sent from the server and stored in the browser
    - saved in the browser while the user is interacting with the website
  - the `JWT` containing the user's id can be sent with a `cookie`
  - To protect the cookie against javascript attacks, make sure that it is `HttpOnly`
    - makes the cookies essentially invisible to client-side javascript
  - To better secure the data, we should use `https` connection to send the data if possible
    - http requests can still be intercepted by "man-in-the-middle" attacks
    - it takes extra configuration to set up https connection
      - not done in development, but should be done in production
  - Implementing cookies in Express
    - needs `cookie-parser` package
    - add the package as middleware in `server.js`
    - http responses can now send cookies by chaining it in the response `res.json()` call
    - when the client has the cookie, it can now send it with every api call
    ```
    npm install cookie-parser
    ```
    ```js
    // server.js
    const cookieParser = require('cookie-parser');
    //...
    app.use(cookieParser());
    // Change the app.use(cors()) to the one below
    app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
    ```
    ```js
    // as a response in user.controller.js
    res.cookie("mycookie", "mydata", { httpOnly: true }).json({
      message: "This response has a cookie"
    });
    ```
- async/await
  - when nesting `promises` using `.then()` and `.catch()`, the code can become very complicated
    - the inner promise is inside the `.then()` of the outer promise
    - also known as callback hell
    ```js
    function oneAfterAnother(startingVal) {
        firstFunc(startingVal)
            .then(firstResult => {
                secondFunc(firstResult)
                    .then(secondResult => /* do something with the second result */)
                    .catch(console.log)
            })
            .catch(console.log);
    }
    ```
  - one way to improve this is chaining the second promise with multiple `.then()`
    ``` js
    function oneAfterAnother(startingVal) {
        firstFunc(startingVal)
            .then(secondFunc) // equivalent to .then(firstResult => secondFunc(firstResult))
            .then(secondResult => /* do something with the second result */)
            .catch(console.log); // logs out error if thrown
    }
    ```
  - ES7 introduces `async` and `await`
    - pause the execution of certain lines while the promise is processed
    - designate the function as `async`
    - use `await` on lines to wait for promise resolution
    - to replace the `.catch()`, place all `await` lines inside a `try / catch` block
      ``` js
      async function oneAfterAnother(startingVal) {
          try {
              const firstResult = await firstFunc();
              const secondResult = await secondFunc(firstResult);
      
              return secondResult;
          } catch(err) {
              // do something with the error here
          }
      }
      ```
- Login/Logout
  - Login:
    - user submits login form in React
    - verify user credentials in Express
      - the email must exist
      - the hashed password linked to the email must match the one in database
    - if valid, create and send a JWT back to the user
      - we can also create and send the JWT back to the user when registering
        - automatically logs the user in
  - Logout:
    - delete the usertoken cookie 
    ```js
    // in user.controller.js
    // import bcrypt
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
    
        if(user === null) {
            // email not found in users collection
            return res.sendStatus(400);
        }
    
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
    
        if(!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400);
        }
    
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
    
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

    // updated register logic: log the user in when registering
    register: (req, res) => {
      User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);
    
            res
                .cookie("usertoken", userToken, secret, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
    }
    // logout: delete the token from cookies
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
    ```
- Authorization and Middleware
  - The authentication logic can be written as middleware
    - checks the verifies the usertoken
    - the function will be called when certain routes require authentication
  ``` js
  // jwt.config.js
  const jwt = require("jsonwebtoken");
  
  module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
      if (err) { 
        res.status(401).json({verified: false});
      } else {
        next();
      }
    });
  }
  ```
  ```js
  // inside of user.routes.js
  const Users = require('../controllers/user.controller');
  const { authenticate } = require('../config/jwt.config');
  module.exports = app => {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    // this route now has to be authenticated
    app.get("/api/users", authenticate, Users.getAll);
  }
  ```
  - in the front end:
    - when sending requests that requires authentication, include this as part of `config`
      - `{ withCredentials: true }`
      - for `axios` API calls, the `get` and `delete` route will have arugments url and config
        - for `post` and `put`, the arguments are url, data, config
          - data is the request body (the inputs in forms, etc)
  ```js
  // when fetching in React
  axios.get("www.example.com/api/users",{ withCredentials: true })
  axios.post("www.example.com/api/users",{input:value,someotherkey:someothervalue},{ withCredentials: true })
  ```