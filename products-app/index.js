require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("sync db complete ");
  })
  .catch(err => console.log(err));

require("./routes/image.routes")(app);
require("./routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_LOCAL_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Добро пожаловать в приложение!" });
});