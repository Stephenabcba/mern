const Joke = require('../models/joke.model');

module.exports.findAllJokes = (req, res) => {
    Joke.find()
        .then(allJokes => res.json({ jokes: allJokes }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
}

module.exports.oneJoke = (req, res) => {
    Joke.findOne({ _id: req.params._id })
        .then(oneJoke => res.json({ joke: oneJoke }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
}

// module.exports.randomJoke = (req, res) => {
//     Joke.findOne()
//         .then(oneJoke => res.json({ joke: oneJoke }))
//         .catch(err => res.json({ message: "Something went wrong", error: err }));
// }

module.exports.createJoke = (req, res) => {
    Joke.create(req.body)
        .then(createdJoke => res.json({ joke: createdJoke }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
}

module.exports.updateJoke = (req, res) => {
    Joke.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
        .then(updatedJoke => res.json({ joke: updatedJoke }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
}

module.exports.deleteJoke = (req, res) => {
    Joke.findByIdAndDelete(req.params._id)
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
}