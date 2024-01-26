const User = require("../models/user.model");
const authUtil = require("../util/authentication");

function getSignup(req, res) {
  return res.render("customer/auth/signup");
}

async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
  return res.render("customer/auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);

  const exitingUser = await user.getUserWithSameEmail();

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
