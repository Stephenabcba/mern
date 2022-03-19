# Comprehensive Repository for the MERN stack
## MERN
- why javascript?
  - js is popular
  - event loop (from Node.js)
    - allows js backend to run asynchronously
  - can be used in both front end and back end


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
    npm init -y
    npm install express mongoose cors
    touch server.js
    mkdir server
    npx create-react-app client 
    cd client
    npm install axios react-router-dom@5
    ```