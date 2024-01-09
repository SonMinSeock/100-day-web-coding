const express = require("express");
const router = express.Router();
const db = require("../data/database");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db
    .getDb()
    .collection("posts")
    .find({})
    .project({ title: 1, summary: 1, "author.name": 1 })
    .toArray();

  console.log(posts);
  res.render("posts-list", { posts: posts });
});

router.post("/posts", async function (req, res) {
  const authorId = new ObjectId(req.body.author);

  const author = await db.getDb().collection("authors").findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);

  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();

  res.render("create-post", { authors: authors });
});

router.get("/posts/:id", async function (req, res) {
  const { id } = req.params;

  const postId = new ObjectId(id);

  const post = await db.getDb().collection("posts").findOne({ _id: postId });

  const postData = {
    ...post,
    date: post.date.toISOString(),
    humanReadableDate: post.date.toLocaleString("ko-KR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  if (!post) {
    return res.status(404).render("404");
  }

  res.render("post-detail", { post: postData });
});

module.exports = router;
