const express = require("express");
const router = express.Router();
const db = require("../data/database");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.post("/posts", async function (req, res) {
  const authorId = new ObjectId(req.body.author);

  const author = await db.getDb().collection("authors").findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);
  console.log(result);
  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();

  res.render("create-post", { authors: authors });
});

module.exports = router;
