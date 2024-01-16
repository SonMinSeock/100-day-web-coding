const express = require("express");

const db = require("../data/database");

const router = express.Router();

const bcrypt = require("bcryptjs");

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }
  res.render("login", { inputData: sessionInputData });
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const confirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (
    !enteredEmail ||
    !confirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== confirmEmail ||
    !enteredEmail.includes("@")
  ) {
    console.log("Incorrect data.");
    // res.render("signup");(X)

    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      email: enteredEmail,
      confirmEmail: confirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const exitingEmail = await db.getDb().collection("users").findOne({ email: enteredEmail });

  if (exitingEmail) {
    req.session.inputData = {
      hasError: true,
      message: "User exists already!",
      email: enteredEmail,
      confirmEmail: confirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      console.log("exiting email!");
      res.redirect("/signup");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const exitingUser = await db.getDb().collection("users").findOne({ email: enteredEmail });

  if (!exitingUser) {
    console.log("Could not log in!");
    req.session.inputData = {
      hasError: true,
      message: "Could not log in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  const passwordsAreEqual = await bcrypt.compare(enteredPassword, exitingUser.password);

  if (!passwordsAreEqual) {
    console.log("Could not log in - passwords are not equal!");
    req.session.inputData = {
      hasError: true,
      message: "Could not log in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  req.session.user = { id: exitingUser._id, email: exitingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
});

router.get("/admin", async function (req, res) {
  if (!req.session.isAuthenticated) {
    // if (!req.session.user)
    return res.status(401).render("401");
  }

  const user = await db.getDb().collection("users").findOne({ _id: req.session.user.id });

  if (!user || !user.isAdmin) {
    return res.status(403).render("403");
  }
  res.render("admin");
});

router.get("/profile", function (req, res) {
  if (!req.session.isAuthenticated) {
    // if (!req.session.user)
    return res.status(401).render("401");
  }
  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
