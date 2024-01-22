const express = require("express");
const authRouter = require("./routes/auth.routes");

const PORT = 3000;

const app = express();

app.use(authRouter);

app.listen(PORT, () => {
  console.log(`localhost:${PORT} SERVER RUNING`);
});
