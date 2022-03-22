const express = require('express');
const cors = require('cors');
const PORT = 8000;
const app = express();
require('./config/mongoose.config')

// middleware
app.use(cors(), express.json(), express.urlencoded({ extended: true }));

// routes
require('./routes/author.routes')(app);


app.listen(PORT, () => {
    console.log(`Server has started and listening at port ${PORT}`);
})