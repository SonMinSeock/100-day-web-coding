const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

app.get("/", function (req, res) {
  res.send(
    "<form action='/store-user' method='POST'><label for='username'>Your Name</label><input type='text' id='username' name='username'/><button>Submit</button></form>"
  );
}); // localhost:3000/

app.post("/store-user", function (req, res) {
  const username = req.body.username;
  res.send("<h1>" + username + "</h1>");
});

app.listen(3000);
