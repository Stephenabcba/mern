# MongoDB
## MongoDB
- name came from huMONGOus
- NoSQL database - > Not Only SQL
  - it does support structured query language
  - we don't need to store data in tables
  - there are no relations between data
    - therefore, there is no `JOIN` operation
      - joining is a processing-intensive task
  - promotes speed
- everything stored in MongoDB is in `JSON` format
  - JavaScript Object Notation
- Installing MongoDB
  - Windows: install `Community Server/Windows/2008 Server x64` version
  - mongo is installed here: `c:/"Program Files"/MongoDB/Server/<version_number>/bin/`
  - to run the database, navigate to that directory in terminal
    ```
    mongo.exe
    ```
- comparison to SQL database
  <table>
  <thead>
  <tr>
  <th>Database Type:</th>
  <th>SQL</th>
  <th>Mongo</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>Database</td>
  <td>Schema</td>
  <td>Database (db)</td>
  </tr>
  <tr>
  <td>Colleciton of related records</td>
  <td>Tables</td>
  <td>Collections</td>
  </tr>
  <tr>
  <td>Each record in collection</td>
  <td>Row/Record</td>
  <td>Document</td>
  </tr>
  </tbody>
  </table>

  - NOTE: ALL OF THESE COMMANDS ARE RUN IN MONGO SHELL
  - database-level commands
    - `show dbs` show all databases
    - `db` show current database selected
    - `use DB_NAME` switch to database with name DB_NAME
      - if database does not exist, mongo will create it for you
    - `db.dropDatabse()` drop (delete) the currently selected database
      - we have to select a database first with `use` to drop it
  - collection-level commands: after we select a collection
    - in SQL databases, a lot of metadata (column names) are set at the table level
    - in NoSQL databases, the metadata are set in the document level
      - a collection is just an array/dictionary of objects
      - the actual data structure is saved in the document (objects) themselves
    - `show collections` show all collections in the database
      - equivalent to SQL tables
    - `db.createCollection("COLLECTION_NAME")`
      - create a collection with given name
    - `db.COLLECTION_NAME.drop()`
      - delete the collection (table)
  - document-level: manipulating items in a collection
    - not every object needs to have the same fields in NoSQL
    - we are trading structure for flexibility
    - the objects are actually stored as BSON (Binary JSON) in Mongo, for easier file storage and ability to store dates
      - we can use the data just like regular JSON
    - All document commands are run on a collection
    - `insert()` add an entry to the database
      - if `_id` is not given, it is automatically generated
    - `find()` looks for all documents that matches the input object
      - if the object has multiple attributes, only documents that match all attributes will be returned
        - ex: if we search by name and favorite_food, both fields need to match from the document to be returned
      - if we do not include an object to match or include an empty object, all items are returned
      - optionally, we can use `.find().pretty()` for some basic formatting
      - to query by id, we need to use the entire field saved in the `_id` field
        - including `ObjectId()` if the id is auto-generated
        - sorting by auto-generated id will return the collection sorted based on creation time
    - `remove()` removes items that match the object provided in argument
      - the match logic is similar to `find()`
      - by default `remove()` will delete all objects that match
      - we can specify that we only want to delete the first one by providing the optional second argument
        - if it is true, `remove()` will only delete one
        - if it is false (default), all matched objects will be deleted
    - `update()` will replace the found object with the given object
      - by default, `update()` will modify the first object that matched
        - `updateMany()` will modify all objects that matched
      - everything except the id will be replaced
      - all previous data is lost
      - we can avoid this by using `update operator`

    ```js
    // CREATE
    // Pattern:
    db.COLLECTION_NAME.insert({YOUR_JSON_DOCUMENT})  
    
    // Example:
    db.ninjas.insert({name: "Trey", belt: "black", status: "awesome"})


    // READ
    // Pattern: 
    db.COLLECTION_NAME.find({YOUR_QUERY_DOCUMENT})

    // GetOne
    // Example:
    db.ninjas.find({name: "Trey", belt: "black"})

    // GetAll
    // Examples:
    db.ninjas.find({})    
    db.ninjas.find()
    // with some formatting
    db.ninjas.find().pretty()
    // find by auto-generated id
    db.ninjas.find({_id: ObjectId("5462a78e514e258182f4c69a")})


    // DELETE
    // Pattern:
    db.COLLECTION_NAME.remove({YOUR_QUERY_DOCUMENT}, BOOLEAN)
    // Example
    // delete all matches
    db.ninjas.remove({belt: "yellow"})
    // delete the first match
    db.ninjas.remove({belt: "yellow"}, true) 
    // DELETE


    // UPDATE
    db.COLLECTION_NAME.update({YOUR_QUERY_DOCUMENT}, {NEW_QUERY_DOCUMENT}, {OPTIONS})
    // the found object is completely overwritten except the id
    // all previous information is lost, with only "location" attribute leftover
    db.ninjas.update({name: "Trey"}, {location: "Mountain View"})
    // this will add attribute of "location", which is what we want
    db.ninjas.update({name: "Trey"}, {$set: {location: "Mountain View"}})
    ```
- Operators
  - allows us to `operate` on the data
    - MongoDB queries are method-based
      - as opposed to typed syntax in SQL
  - `$set: {}` update operator
    - allows us to only modify specific attributes in an object in `update()`
    - see `update()` above for example
  - comparison operators
    - used in the query field in document methods
      - all 3 methods except `insert()` uses an object to query and operate
    - matches all items that matches the condition
    - if we want to get values between x and y, use greater than x and less than y
      - or use the "or equal to" variant as needed
    - `{$gt: x}` greater than x
    - `{$gte: x}` greater than or equal to x
    - `{$lt: x}` less than x
    - `{$lte: x}` less than or equal to x
    - `{$in: [x,y,z...]}` : the attribute contains x,y, or z
      - if the attribute is an array, match if any of its contents matchs x, y, or z
      - if the attribute is a primitive value (string/num), match if its value matches x,y, or z
      - there can be as many items in the match array as we need
        - x, x y, x y z, x y z a b c, etc
  - array operators
    - used for updating arrays in a document
    - `$push` : push item to array
    - `$pop` : removes either the first or last item from the array
      - 1 is last item, -1 is first item
    - `$addToSet` : similar to `$push`, but will not add the value if it is already in the array
      - prevents adding duplicates
    - `$pull` : remove items in the array by value
      - ALL items that matches value will be removed
  - `$inc`: increases each attribute by specified number
    - each attribute needs its own increment value
    - if the number is negative, decrease the value instead.
  - `$rename`: renames each attribute to their new names
  - `$unset`: delete the attributes
    - the value attached to the attribute_key is irrelevant
  - `$currentDate`: adds the current time and date as specified attribute
    - if the attribute_key has value of true, it is defaulted to an ISODate object
      - if the value is set as an object with `$type: "timestamp"`, the time is saved as a Timestamp object
  - <a href="http://docs.mongodb.org/manual/reference/operator/">complete list of all operators</a>
    ```js
    // gt, lt, gte, lte find all dojos with number of students greater than 15
    db.dojos.find({number_of_students: {$gt: 15}})
    db.dojos.find({number_of_students: {$gte: 15, $lt:30}})

    // in: find all documents in COLLECTION with array_key array containing either VALUE1 or VALUE2
    db.COLLECTION.find( { array_key: { $in: [ "VALUE1", "VALUE2" ]} } ).pretty()

    // in: find all documents in COLLECTION with attribute_key attribute that has the value of either VALUE1 or VALUE2
    db.COLLECTION.find( { attribute_key: { $in: [ "VALUE1", "VALUE2" ]} } ).pretty()

    // inc: for all documents in COLLECTION that matched with QUERY, increase attribute_key by NUM, increase attribute_key2 by NUM2
    db.COLLECTION.updateMany({QUERY},{$inc:{attribute_key:NUM, attribute_key2: NUM2}})

    // rename: for all matching documents, rename the attribute to NEWNAME
    db.COLLECTION.updateMany({QUERY},{$rename:{attribute_key:"NEWNAME", attribute_key2:"NEWNAME2"}})

    // unset: for all matching documents, delete the attributes
    db.COLLECTION.updateMany({QUERY},{$unset:{attribute_key:"", attribute2:""}})

    // currentDate: for all matching documents, add the attribute attribute_key to the document
    db.COLLECTION.updateMany({QUERY},{$currentDate:{attribute_key:true, attribute_key2:{$type:"timestamp"}}})

    // push: find the student with given id, and push snowboarding into the interests array
    db.students.update({_id: ObjectId("5463d871a6a96d5ed6252f4d")}, {$push: {interests: 'snowboarding'}})

    // pop: find the object matching query, and remove either first (-1) or last (1) item in the array_key array
    db.COLLECTION.update({QUERY}, {$pop: {array_key: (1 or -1)}})

    // pull: remove ALL items that have value of VALUE in the array_key array
    db.COLLECTION.update({QUERY}, {$pull: {array_key: VALUE}})
    ```

## Mongoose
- Express + Mongoose
  - Mongoose is a library that simplifies MongoDB queries with its own methods
    - enables validation and run complex queries more effectively
  ```
  npm init -y
  npm install mongoose express
  ```
  - connection to MongoDB with Mongoose
    - `mongoose.connect()`
      - uses the `Promise` format with `.then` and `.catch`
      - the object contains options, the two we use removes deprecation messages
      - if we are connecting to a database that doesn't exist, Mongoose will create it for us when we create the first document (saved object in db)
    ``` js
    // /server/config/mongoose.config.js
    // all files that uses mongoose will need to import it
    const mongoose = require('mongoose');

    // connect to the database
    mongoose.connect('mongodb://localhost/name_of_your_DB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Established a connection to the database'))
        .catch(err => console.log('Something went wrong when connecting to the database ', err));
    ```
  - creating schema and model
    - using Mongoose, we can create some structure to our data
      - this is from the library, not MongoDB
    - we can specify keys, types, and validations
    - in the model file, we define the schema and create the model
    - `new mongoose.Schema()`: use the class constructor to define the keys and their datatypes to build the model
      - <a href="http://mongoosejs.com/docs/schematypes.html">other datatypes available</a>
    - `mongoose.model()` : take the blueprint object created by schema and create the necessary database collection (MongoDB equivalent of SQL table)
    - export the model for other parts to use
    ``` js
    // /server/models/user.model.js
    const mongoose = require('mongoose');
    
    const UserSchema = new mongoose.Schema({
        name: String,
        age: Number
    });
    
    const User = mongoose.model('User', UserSchema);
    
    module.exports = User;
    ```
  - using the model to CRUD in controller
    - no longer need to import mongoose
      - instead, we import our model file
    - the controller only handles CRUD, no routing
    - if the action is successful, `.then()` runs
      - some sort of success/object is returned as response
    - if the action failed, `.catch()` runs
      - some sort of error message is returned as response
    ``` js
    // /server/controllers/user.controller.js
    const User = require('../models/user.model');
    
    module.exports.findAllUsers = (req, res) => {
        User.find()
            .then(allDaUsers => res.json({ users: allDaUsers }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }
    
    module.exports.findOneSingleUser = (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(oneSingleUser => res.json({ user: oneSingleUser }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }
    
    module.exports.createNewUser = (req, res) => {
        User.create(req.body)
            .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }
    
    module.exports.updateExistingUser = (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedUser => res.json({ user: updatedUser }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }
    
    module.exports.deleteAnExistingUser = (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(result => res.json({ result: result }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }
    ```
  - Routing
    - import all functions written in controller
    - routing done with Express logic
      - each route calls the functions from controller
    ``` js
    // /server/rouses/user.routes.js
    const UserController = require('../controllers/user.controller');
    
    module.exports = app => {
        app.get('/api/users', UserController.findAllUsers);
        app.get('/api/users/:id', UserController.findOneSingleUser);
        app.put('/api/users/:id', UserController.updateExistingUser);
        app.post('/api/users', UserController.createNewUser);
        app.delete('/api/users/:id', UserController.deleteAnExistingUser);
    }
    ```
  - Server
    - import the routing function
    - handles all Express server functionalities
    - set up server, connect the routes that were modularized to the routes file, run the server
    ``` js
    // /server.js
    const express = require("express");
    const app = express();
        
    require("./server/config/mongoose.config");
        
    app.use(express.json(), express.urlencoded({ extended: true }));
        
    const AllMyUserRoutes = require("./server/routes/user.routes");
    AllMyUserRoutes(app);
        
    app.listen(8000, () => console.log("The server is all fired up on port 8000"));
    ```
- Validations
  - validations can be specified when creating the schema in model files
  - details in <a href="http://mongoosejs.com/docs/validation.html">documentation</a>
    ``` js
    const UserSchema = new mongoose.Schema(
      {
        first_name: {
          type: String,
          required: [true, "First name is required"],
          minlength: [6, "First name must be at least 6 characters long"]
        },
        last_name: {
          type: String,
          required: [true, "Last name is required"],
          maxlength: [20, "Last name must be at least 6 characters long"]
        },
        age: {
          type: Number,
          min: [1, "You must be at least 1 or older to register"],
          max: [150, "You must be at most 149 years old to register"]
        },
        email: { type: String, required: [true, "Email is required"] }
      },
      { timestamps: true }
    );
    ```
- Nested Documents
  - is used to avoid joining tables/collections
  - we place related documents directly inside the current document
  - very easy to store duplicates in database
  - a document can be inside another document inside another document
``` js
const UserSchema = new mongoose.Schema({
  fName: String,
  lname: String,
  friends: [UserSchema]
  bankAccounts: [BankAccountSchema]
})
// BankAccountSchema created elsewhere
```


## Commonly used mongoose code
- more in <a href="http://mongoosejs.com/docs/index.html">documentations</a>
```js
// models
// Create a Schema for Users
const UserSchema = new mongoose.Schema({
 name: { type: String },
 age: { type: Number }
}, { timestamps: true })
// create a constructor function for our model and store in variable 'User'
const User = mongoose.model('User', UserSchema);
```

```js
// controllers

// ***CREATE***
// ...create a new document to store in the User collection and save it to the DB.
const bob = new User(req.body);
// req.body is an object containing all the users data.
// if we look at req.body as an object literal it would look like this
	/*
     * req.body = {
     *		"name": "Bob Ross",
     *		"age": 42
     *	}
    **/
bob.save()
    .then(newUser => {
        // logic with succesfully saved newUser object
    })
    .catch(err => res.json(err));
 // If there's an error and the record was not saved, this (err) will contain validation errors.

// can create the entry without making an instance of the model class
// ...create a new document to store in the User collection and save it to the DB.
const { userData } = req.body;
User.create(userData)
    .then(newUser => {
        // logic with succesfully saved newUser object
    })
    .catch(err => res.json(err));
 // If there's an error and the record was not saved, this (err) will contain validation errors.

// validation for uniqueness before creating
User.exists({name: req.body.name})
    .then(userExists => {
        if (userExists) {
            // Promise.reject() will activate the .catch() below.
            return Promise.reject('Error Message Goes Here');
        }
        return User.create(req.body);
    })
    .then(saveResult => res.json(saveResult))
    .catch(err => res.json(err));

// ***READ***
// ALL
// ...retrieve an array of all documents in the User collection
User.find()
    .then(users => {
        // logic with users results
    })
    .catch(err => res.json(err));

// ONE BY NAME
// ...retrieve an array of documents matching the query object criteria
User.find({name:'Jessica'}) 
    .then(usersNamedJessica => {
        // logic with usersNamedJessica results
    })
    .catch(err => res.json(err));

// ONE BY ID
// ...retrieve 1 document (the first record found) matching the query object criteria
User.findOne({_id: '5d34d361db64c9267ed91f73'})
    .then(user => {
        // logic with single user object result
    })
    .catch(err => res.json(err));

// ***UPDATE***
// UPDATE ONE
// ...update 1 document that matches the query object criteria
User.updateOne({name:'Bob Ross'}, {
    name: 'Ross Bob',
    $push: {pets: {name: 'Sprinkles', type: 'Chubby Unicorn' }}
})
    .then(result => {
        // logic with result -- note this will be the original object by default!
    })
    .catch(err => res.json(err));

// UPDATE ONE (alternative)
// retrieving the object, modifying it, and then save it back to database
User.findOne({name: 'Bob Ross'})
    .then(user => {
        user.name = 'Rob Boss';
        user.pets.push({name: 'Sprinkles', type: 'Chubby Unicorn'});
        return user.save();
    })
    .then(saveResult => res.json(saveResult))
    .catch(err => res.json(err));

// ***DELETE***
// DELETE ALL
// ...delete all documents of the User collection
User.remove()
    .then(deletedUsers => {
        // logic (if any) with successfully removed deletedUsers object
    })
    .catch(err => res.json(err));

// DELETE ONE
// ...delete 1 document that matches the query object criteria
User.remove({_id: '5d34d361db64c9267ed91f73'})
    .then(deletedUser => {
        // logic (if any) with successfully removed deletedUser object
    })
    .catch(err => res.json(err));
```

## Additional notes
- `__v` is mongoDB's version control variable, we do not need to touch it
- when we use `mongoose` as our ORM, any variable in the form that is not part of the `schema` we created is ignored
  - if the schema has `name` and `email`, and the form only has `test`, nothing is created
    - if we had data validation, an error is returned as response
    - otherwise, there's no error message but nothing gets added to the database either
- in `updateOne`, we pass in two options
  - `{ new: true, runValidators: true }`
  - `new` means the Promise returns the updated object
    - if not set, the Promise returns the old object
  - `runValidators` will validate the input before updating