const PlayerController = require('../controllers/player.controller')

module.exports = (app) => {
    app.get('/hello', (req, res) => res.json({ message: "Hello World" }));
    app.post('/api/players', PlayerController.createNewPlayer);
    app.get('/api/players', PlayerController.findAllPlayers);
    app.get('/api/players/:id', PlayerController.findOnePlayerById);
    app.put('/api/players/:id', PlayerController.updateExistingPlayer);
    app.delete('/api/players/:id', PlayerController.deletePlayer);
}