const express = require("express");
const PORT = 3000;

const app = express();

app.get("/quote", function (req, res, next) {
  res.json({
    quote: "As you dive deeper into web development, web development will dive deeper into you!",
  });
});

app.listen(PORT, () => {
  console.log(`SERVER LISTEN ON : ${PORT}`);
});
