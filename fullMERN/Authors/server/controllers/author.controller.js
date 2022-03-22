const Author = require('../models/author.model');

// C
// CREATE ONE
module.exports.createNewAuthor = (req, res) => {
    Author.create(req.body)
        .then(newAuthor => res.json({ author: newAuthor }))
        .catch(err => res.status(400).json(err));
}

// R
// FIND ALL
module.exports.findAllAuthors = (req, res) => {
    Author.find()
        .then(allAuthors => res.json({ authors: allAuthors }))
        .catch(err => res.status(400).json(err));
}

// FIND ONE
module.exports.findOneAuthorById = (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(oneAuthor => res.json({ author: oneAuthor }))
        .catch(err => res.status(400).json(err));
}

// U
// UPDATE ONE
module.exports.updateExistingAuthor = (req, res) => {
    Author.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedAuthor => res.json({ author: updatedAuthor }))
        .catch(err => res.status(400).json(err));
}

// D
// DELETE ONE
module.exports.deleteAuthor = (req, res) => {
    Author.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json(err));
}