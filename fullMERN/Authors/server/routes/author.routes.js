const AuthorController = require('../controllers/author.controller')

module.exports = (app) => {
    app.get('/hello', (req, res) => res.json({ message: "Hello World" }));
    app.post('/api/authors', AuthorController.createNewAuthor);
    app.get('/api/authors', AuthorController.findAllAuthors);
    app.get('/api/authors/:id', AuthorController.findOneAuthorById);
    app.put('/api/authors/:id', AuthorController.updateExistingAuthor);
    app.delete('/api/authors/:id', AuthorController.deleteAuthor);
}