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
- Update and Delete
  - in Express, create the routes and controller methods
    - both routes should take an `id`, and the controllers should process based on the id
    - update: use `put` route and either `findOneandUpdate()` or `updateOne()`
    - delete: use `delete` route and either `deleteOne()` or `remove()`
  - in React, create the html elements and api calls
    - update:
      - when updating, the current `route` should have an `id` param
        - get the param with `useParam()`
      - first, fetch the object to be modified using `axios.fetch()` inside `useEffect()`
        - call the Express route for the given `id`
        - populate the fields of the form using `setState()` equivalents
      - html will most likely involve a `form` that resembles creating a new object
        - data binding is done with `value={stateName}` for each field
        - `onChage()` to keep track of the state
        - `onSubmit` will call the handler function
      - the handler function
        -  `preventDefault()` to remove the page refresh
        -  call the api using `axios.put` at update route with `id` and submit the updated fields
    - delete:
      - deleting requires an `id`, which could either be obtained from the object in `ShowAll` or `ShowOne` component, or from the `route` through `useParam()`
      - html for delete is simply a `button` with `onClick()` calling the handler function
      - the handler function
        - call the api using `axios.delete` at the delete route with `id`
          - we can also choose to remove the item from the list using `filter()` and `setState()` if the api call succeeded



## Advanced MERN
- Reusing Components
  - refactoring the create and update form into the same component:
    - the form itself can be abstracted out
      - the `initial values` and `submitHandler` are passed in as `props`
        - in a create form, initial values are blank
        - in an update form, initial values are the values from api call
    - when the create form is submitted, we can add the new item returned into the state
      ``` js
      // newItem is the returned object when we did axios.post()
      setState([...state,newItem])
      ```
  - refactpring the delete button:
    - the button button itself can be a component
    - 2 `props` to pass in: `id` of the item to delete, and `callback function` to execute when successfull
    - the callback function:
      - in a showAll component: `filter()` out the item with the given `id` when successful
      - in a showOne/editOne component: `history.push()` back to the main page
- Presentational and Container Components
  - presentational components take in props and display them, sometimes executing callback functions passed through props as well
  - container components will hold state and logic, such as `fetch` and `useState`
  - it is not always necessary to separate out presentational and container components


## Additional info