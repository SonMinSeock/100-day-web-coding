const express = require("express");
const db = require("../data/database");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `
    SELECT posts.*, authors.name AS author_name FROM posts
    INNER JOIN authors ON posts.author_id = authors.id`;

  const [posts] = await db.query(query);

  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors");

  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  const { title, summary, content, author } = req.body;
  const data = [title, summary, content, author];

  await db.query("INSERT INTO posts (title, summary, body, author_id) VALUES (?)", [data]);
  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const { id } = req.params;

  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM POSTS
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?
  `;

  const [posts] = await db.query(query, [id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  res.render("post-detail", { post: posts[0] });
});

module.exports = router;
