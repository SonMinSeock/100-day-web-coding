const express = require("express");
const authRouter = require("./routes/auth.routes");
const path = require("path");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`localhost:${PORT} SERVER RUNING`);
});
