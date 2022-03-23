const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required!"],
        minlength: [2, "{PATH} needs to be at least 2 characters long!"]
    },
    prefPosition: {
        type: String
    },
    statuses: {
        type: [Number],
        default: [0, 0, 0]
    }
}, { timestamps: true });

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;