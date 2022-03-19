const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 8000;

require("./server/config/mongoose.config");
app.use(cors());

// middleware
app.use(express.json(), express.urlencoded({ extended: true }));


require("./server/routes/product.routes")(app)


app.get("/", (req, res) => res.json({ message: "Success" }))

app.listen(PORT, () => console.log(`Server started and listening on port ${PORT}.`));