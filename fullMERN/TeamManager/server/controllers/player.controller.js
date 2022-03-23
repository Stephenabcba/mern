const Player = require('../models/player.model');

// C
// CREATE ONE
module.exports.createNewPlayer = (req, res) => {
    Player.create(req.body)
        .then(newPlayer => res.json({ player: newPlayer }))
        .catch(err => res.status(400).json(err));
}

// R
// FIND ALL
module.exports.findAllPlayers = (req, res) => {
    Player.find()
        .then(allPlayers => res.json({ players: allPlayers }))
        .catch(err => res.status(400).json(err));
}

// FIND ONE
module.exports.findOnePlayerById = (req, res) => {
    Player.findOne({ _id: req.params.id })
        .then(onePlayer => res.json({ player: onePlayer }))
        .catch(err => res.status(400).json(err));
}

// U
// UPDATE ONE
module.exports.updateExistingPlayer = (req, res) => {
    Player.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPlayer => res.json({ player: updatedPlayer }))
        .catch(err => res.status(400).json(err));
}

// D
// DELETE ONE
module.exports.deletePlayer = (req, res) => {
    Player.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json(err));
}