# Express
- API
  - Application Programming Interface
  - web API is a set of HTTP endpoints
    - rules that we need to follow to retrieve data or make changes
    - middleman between frontend and actual database
    - usually web URLs to pass information through
- Postman
  - Our backend Server responds to HTML requests with JSON responses
    - it takes time to write front end webpage to handle the requests and responses
  - Postman is an application that allows us to send any HTML requests and display any JSON responses
    - we can directly test backend API without worrying about frontend details
- HTTP Methods
  - Forms
    - modern internet is user-driven, data is from user input
      - the input is collected through forms
    - when the form is submitted, we have to decide what kind of HTTP method we want to send it through
      - in general, sensitive information such as password is sent through `POST`
      - a general google search can be done through `GET`
  - HTTP Methods: 5 methods
    - `GET`: pass insensitive information
      - all query parameters are sent as part of URL
      - can be bookmarked
        - easy access by users
      - security concerns
        - not secure, shows in URL
        - can be cached
        - will be stored in browser history
    - `POST`: pass sensitive information
      - form data is hidden
      - no restriction on how much data you can send
      - most forms are sent through `POST`
    - `PUT`: update whole sensitive information
      - similar to `POST`, but is used to update a whole entity in database
    - `PATCH`: update pieces of sensitive information
      - similar to `POST` and `PUT`, but is used to update a piece of entity in database
    - `DELETE` delete sensitive information
      - sent to delete entity from database
  - HTML forms can only send `GET` and `POST` requests
    - some frameworks allow for hidden inputs that specify that the form is actually sending `PUT` or `DELETE` method
      - the `form` tag itself still has method of `POST`
- Express + Nodemon
  - framework to act as a server in Node
  - our projects now need `server.js`
  - `GET` and `POST` continued in next section
    ```js
    // server.js

    // standard setup, import express and set the port
    const express = require("express")
    const app = express()
    const port = 8000

    // get request at route /api
    // req short for request, res short for response
    app.get("/api", (req,res)=>{
        res.json({message: "Hello World"});
    })

    // at the end of server file, listen to port specified above
    app.listen( port, () => console.log(`Listening on port: ${port}`) );
    ```
    ```
    node server.js
    ```
  - Nodemon
    - node monitor
    - a package that we can install globally
    - automatically restart our server when we save a change
    ```
    npm install -g nodemon
    ```
    ```
    nodemon server.js
    ```
- Routing
  - since we are making an API, each route should start with `/api`
  - `app.get()`
    - 1st input: the route name
      - ex: `/api/chickens`
    - 2nd input: callback function
      - input: `request` and `response`
        - these could be name whatever we want
      - to return a json as response: `response.json()`
        - pass in what we want to return as argument
  - pre-req to accessing form data
    - we have to set up our server to handle the form
      - utilize `Express Middleware functions`
        - the following are responsible for providing and parsing `request.body`
        - `express.json()`
        - `express.urlencoded()`
    ``` js
    // 
    // these should be above ALL app.get and app.post
    app.use( express.json() )
    app.use( express.urlencoded({ extended:true }) )
    ```
  - `app.post()`
    - takes the same inputs as `get`
    - accessing the form data
      - `request.body` holds our data
      - we can do any manipulation that we want to the data
        - save it to server, console log, etc
    - at the end of the callback, it needs to respond with something
      - it could be a HTTP status
    ```js
    app.post("/api/users", (req, res) => {
        // req.body will contain the form data from Postman or from React
        console.log(req.body);
        // we can push it into the users array for now...
        // later on this will be inserted into a database
        users.push(req.body);
        // we always need to respond with something
        res.json( { status: "ok" } );
    });
    ```
  - Route Parameters
    - `:` in route denotes a path variable
    - available in `request.params`
    ``` js
    // if we want to get a user with a specific id, we can make the id a part of the url
    // be sure to preface the id variable with a `:` colon
    app.get("/api/users/:id", (req, res) => {
        // we can get this `id` variable from req.params
        console.log(req.params.id);
        // assuming this id is the index of the users array we could return one user this way
        res.json( users[req.params.id] );
    });
    ```
  - `app.put` and `app.delete`
    - also follows the same 2 input format as `get` and `post`
    - handle the data accordingly
    ``` js
    app.put("/api/users/:id", (req, res) => {
        // we can get this `id` variable from req.params
        const id = req.params.id;
        // assuming this id is the index of the users array we can replace the user like so
        users[id] = req.body;
        // we always need to respond with something
        res.json( { status: "ok" } );
    });

    app.delete("/api/users/:id", (req, res) => {
        // we can get this `id` variable from req.params
        const id = req.params.id;
        // assuming this id is the index of the users array we can remove the user like so
        users.splice(id, 1);
        // we always need to respond with something
        res.json( { status: "ok" } );
    });
    ```
- Folder Structure
  - suggested folder structure to keep projects organized
  - folders:
    - `controllers`: hold all logic for each model (creating, updating, etc)
    - `models`: hold all schemas
    - `routes`: handle routes for each model
    - `server.js` handle all server logic with express
    ```
    server/
        >config/
        >controllers/
        >models/
        >routes/
        server.js 
    ```
  - in order to separate and compartmentalize our files, we need to implement `modules`
- Modules
  - in front end, we can simply access another javascript file through `<script>` with `src` attribute
  - in back end, we have to utilize `module` to work across js files
  - module works in a 2-step process
    - export
      - in the file we want to export from, populate the `module.exports` object with variables and functions
    ``` js
    // method 1: adding each attribute to the object
    module.exports.greet = function() {
    console.log("Hello! We are exporting a function called Greet.");
    };
    
    module.exports.add = function(num1, num2) {
    console.log("The sum is: ", num1 + num2);
    };

    // method 2: creating the object with key-value pairs
    module.exports = {
    greet: function() {
        console.log("Hello! We are exporting a function called Greet.");
    },
    add: function(num1, num2) {
        console.log("The sum is: ", num1 + num2);
    }
    }
    ```
    - import
      - in the file we want to use the functionalities, import the modules with `require()`
        - the argument is the path to file with `module.exports`, without the `.js` suffix
        - if `./` is not included, by default `require()` searches in `node_modules/` folder
    ``` js
    // importing from my_module.js in the same directory, where module.exports exist
    // save the exports object as a variable
    const myCustomModule = require("./my_module");
    myCustomModule.greet();
    myCustomModule.add(5, 7);

    // destructure the exports object to use directly
    const { greet, add } require("./my_module");
    greet();
    add(5, 7);
    ```

## Useful commands
- create `package.json`
    ```
    npm init -y
    ```