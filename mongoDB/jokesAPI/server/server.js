const express = require("express");
const PORT = 8000;
const app = express();

require("./config/mongoose.config")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const AllJokeRoutes = require("./routes/joke.routes");
AllJokeRoutes(app);

app.listen(PORT, () => console.log(`The server is serving jokes on port ${PORT}. Go to /api/jokes to see all the jokes!`));