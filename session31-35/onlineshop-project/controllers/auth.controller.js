const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  return res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  const {
    body: { email, password, fullname, street, postal, city },
  } = req;
  const confirmEmail = req.body["confirm-email"];

  const enteredData = { email, password, fullname, street, postal, city };

  if (
    !validation.userDetailValidation(email, password, fullname, street, postal, city) ||
    !validation.emailIsConfirmed(email, confirmEmail)
  ) {
    sessionFlash.flashDataSession(
      req,
      {
        errorMessage:
          "Please check your input. Password must be at least 6 characters long, postal code must be 5 characters long.",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  try {
    const user = new User(email, password, fullname, street, postal, city);

    const existingAlreadyEmail = user.existsAlready();

    if (!existingAlreadyEmail) {
      sessionFlash.flashDataSession(
        req,
        {
          errorMessage: "이미 계정 존재합니다.",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
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

  const sessionErrorData = {
    errorMessage: "해당 계정 혹은 패스워드 일치하지 않습니다.",
    email: user.email,
    password: user.password,
  };

  if (!exitingUser) {
    sessionFlash.flashDataSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPssword(exitingUser.password);

  if (!passwordIsCorrect) {
    sessionFlash.flashDataSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
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
