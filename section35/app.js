const express = require("express");
const quoteRoutes = require("./routes/quotes.routes");
const db = require("./data/database");

const PORT = 3000;

const app = express();

app.use("/quote", quoteRoutes);

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Something went wrong!",
  });
});

db.initDb()
  .then(function () {
    app.listen(PORT, () => {
      console.log(`SERVER LISTEN ON : ${PORT}`);
    });
  })
  .catch(function (error) {
    console.log("Connecting to the database failed!");
  });
