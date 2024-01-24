const express = require("express");
const authRouter = require("./routes/auth.routes");
const path = require("path");
const db = require("./data/database");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(authRouter);

db.connectToDatabase()
  .then(function () {
    app.listen(PORT, () => {
      console.log(`localhost:${PORT} SERVER RUNING`);
    });
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
