# Full Stack MERN
## Full Stack MERN
- Intro
  - Connecting React to Express+Mongoose
    - Front end:
      - React serves HTML, CSS, JS in a single-page application
      - When data is needed from DB, make API calls with Axios
    - Back end:
      - Express listens for API calls from front end
      - based on the route, express processes the request
      - when needed, mongoose gets data from mongoDB
        - model files will perform validations when required
      - server responds with JSON
- Setting up for MERN
  - Set up express and mongo
  - Set up react
  - Folder structure:
    - server folder holds all server-related files (controllers, models, etc)
    - client folder holds all client-related files (everything React)
    ```
    FOLDER STRUCTURE
    project_name/
        >client/
        >node_module/
        >server/
        >package.json
        >server.js
    ```
  - We will be running 2 servers while we develop
  - We cannot directly connect a React server with an Express server from previous materials
    - Express will not recognize api calls from React
    - `cors` : cross-origin requests needs to be installed and implemented in Express
      - it will need to be imported and added to `server.js`
        ``` js
        // inside server.js
        const express = require('express');
        const cors = require('cors') // This is new
        const app = express();
        app.use(cors()) // This is new
        // ... rest of file
        ```
- Creating a new mongo document through React
  - set up Express API server with all necessary details
    - create mongoose `config` for mongoDB connection
    - create `model`, `controller`, `route` functions as needed
  - create a form in React, and `onSubmit` send an api call through axios
    - `state` and data binding still applies
      - state should be maintained with syntheticEvent handlers
    ``` js
    // in React, preferrably a component with form
    // this function runs as the handler for onSubmit for a form
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/people', {
            firstName,
            lastName
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    ```
- Listing all db entries in React
  - in Express, create the necessary routes and controllers
    - this will most likely involve `find()`
  - in React, display the list
    - create a new `state` and populate it through api call with `axios.get()` and `useEffect()`
    - create a display component that `map()` over the array of entries in state
    - optionally, we can utilize routes with `react-router-dom`
      - we can place the fetch statements inside the components conditionally rendered by `Switch`




## Advanced MERN