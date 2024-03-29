const User = require("../models/auth");
const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

function getSignUp(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("signup", {
    inputData: sessionErrorData,
  });
}

function getLogin(req, res) {
  let sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("login", {
    inputData: sessionErrorData,
  });
}

async function signup(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (!validation.userCredentialsAreValid(enteredEmail, enteredConfirmEmail, enteredPassword)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  const user = new User(enteredEmail, enteredPassword);

  const existingUser = await user.exitsAlready();

  if (existingUser) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "User exists already!",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  await user.signUp();

  res.redirect("/login");
}

async function login(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const user = new User(enteredEmail, enteredPassword);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/login");
      }
    );

    return;
  }

  const passwordsAreEqual = await user.login(existingUser.password);

  if (!passwordsAreEqual) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/login");
      }
    );

    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
}

function logout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
}

function get401(req, res) {
  res.status(401).render("401");
}

module.exports = {
  getSignUp,
  getLogin,
  signup,
  login,
  logout,
  get401,
};
