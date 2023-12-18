const fs = require("fs");
const path = require("path");

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

  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);

  const existingUsers = JSON.parse(fileData);
  existingUsers.push(username);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  res.send("<h1> Username Stored!</h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const users = JSON.parse(fileData);

  let responseData = "<ul>";

  for (let user of users) {
    responseData += "<li>" + user + "</li>"; // <ul><li>사용자이름1</li><li>사용자이름2</li>
  }

  responseData += "</ul>"; // <ul><li>사용자이름1</li><li>사용자이름2</li></ul>

  res.send(responseData);
});

app.listen(3000);
