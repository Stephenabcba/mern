# Comprehensive Repository for the MERN stack
## MERN
- why javascript?
  - js is popular
  - event loop (from Node.js)
    - allows js backend to run asynchronously
  - can be used in both front end and back end
- What MERN Stands for:
  - M: MongoDB, the NoSQL database that stores data
    - In MERN, Mongoose package is used as an ORM to manage database communication
  - E: Express, the backend framework that handles all API calls
  - R: React, the front end library that deals with HTML, CSS, and JavaScript
    - When done correctly, React builds a Single Page Application(SPA), which will never refresh the page unless the user presses the refresh button
      - information is brought in and out of view with JavaScript
  - N: Node.js, the compiler for running JavaScript outside the browser
    - the Express Server and the React developmental seerver are run using Node

## Data Flow
- React will handle everything in the front end (browser)
  - handle the views (HTML), display data, and submit forms
  - all user interations (mouse clicks, keyboard inputs) are handled by React
- Express/Mongoose will run the backend/database
  - handles all database-related logic
    - anything related to Create, Read, Update, Delete
  - communication to the backend server is done through API calls
  - Typically, the database is a list of objects
    - each object will be a standalone item, with its own properties
- Connecting Frontend and Backend with APIs
  - When the frontend needs information stored in the database, make an API call through fetch or axios
    - these calls are done with HTTP Requests
    - as it takes an indeterminate amount of time to process the request, the communication is done asynchronously with promises
  - The backend will listen for any API calls, when an API call is recieved:
    - process the request (creating a new object, updating, deleting, etc)
    - return a HTTP Response of the information requested
  - The frontend will recieve the response and continue dealing with user input
    - the retrieved information is stored in state in React to reduce the volume of API calls needed
    - react will display the information accordingly

## Basic Project Setup:
```
FOLDER STRUCTURE
/project-name
  >client/
    >node_modules
    >public/
    >src/
      >components/
        >MyComponent.jsx
      >App.js
      >...everything else React
  >node_modules
  >server/
    >config/
      >mongoose.config.js
    >controllers/
      >modelName.controller.js
    >models/
      >modelName.model.js
    >routes/
      >modelName.route.js
```
1. Initialize project
  - create `package.json` through npm
  - install `express` and `mongoose` for backend
  - create all required folder structure and files for backend
  - set up react with `create-react-app` from npx
    ```
    touch server.js
    npm init -y
    npm install express mongoose cors
    mkdir server
    npx create-react-app client 
    cd client
    npm install axios react-router-dom@5
    ```
2. Set up server backend
  - create the models, controllers, routes, and server.js
  - test EVERY route in postman to make sure that it is working
    - if React has API problems later in the front end, the problem is in React
3. Create React frontend
  - typically, every view is a component
    - more components could be created as needed
  - make API calls to the backend to retrieve the necessary information
    - a display all component will needs a list of all items
    - a display one component will need the specific item by id
    - a create one component will post the submitted form to the server
      - the post route returns the created item
      - this item can be added to the list in display all if needed
      - if validation failed, the returned response contains the error messages
        - we can display the messages in the form
    - an update one component will need 2 api calls
      - first api call retrieves the current information to pre-populate the form
      - second api call will put the submitted form back to the server
        - the server will return the updated object
    - a delete button will send a delete call to the server
      - we can dynamically delete the item from the display all component using .filter() using the deleted item's id