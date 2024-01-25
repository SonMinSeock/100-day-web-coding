const express = require("express");
const path = require("path");
const csrf = require("csurf");
const authRouter = require("./routes/auth.routes");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
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
