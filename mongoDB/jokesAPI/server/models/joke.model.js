const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    setup: {
        type: String,
        required: [true, "Joke setup is required"],
        minlength: [10, "Joke setup needs at least 10 characters"]
    },
    punchline: {
        type: String,
        required: [true, "Joke punchline is required"],
        minlength: [3, "Joke punchline needs at least 3 characters"]
    }
});

const Joke = mongoose.model('Joke', JokeSchema);

module.exports = Joke;