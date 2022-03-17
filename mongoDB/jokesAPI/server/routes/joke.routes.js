const JokeController = require("../controllers/joke.controller");

module.exports = app => {
    app.get("/api/jokes", JokeController.findAllJokes);
    // app.get("/api/jokes/random", JokeController.randomJoke);
    app.get("/api/jokes/:_id", JokeController.oneJoke);
    app.post("/api/jokes/new", JokeController.createJoke);
    app.put("/api/jokes/update/:_id", JokeController.updateJoke);
    app.delete("/api/jokes/delete/:_id", JokeController.deleteJoke);
}