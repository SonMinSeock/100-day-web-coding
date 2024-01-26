const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");

function getSignup(req, res) {
  return res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  const {
    body: { email, password, fullname, street, postal, city },
  } = req;
  const confirmEmail = req.body["confirm-email"];

  if (
    !validation.userDetailValidation(email, password, fullname, street, postal, city) ||
    !validation.emailIsConfirmed(email, confirmEmail)
  ) {
    res.redirect("/signup");
    return;
  }

  try {
    const user = new User(email, password, fullname, street, postal, city);

    const existingAlreadyEmail = user.existsAlready();

    if (!existingAlreadyEmail) {
      return res.redirect("/signup");
    }
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  return res.render("customer/auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  let exitingUser;

  try {
    exitingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!exitingUser) {
    res.redirect("/login");
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPssword(exitingUser.password);

  if (!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, exitingUser, function () {
    res.redirect("/");
  });
}

async function logout(req, res) {
  authUtil.destoryUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
};
