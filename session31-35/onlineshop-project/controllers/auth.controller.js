function getSignup(req, res) {
  return res.render("customer/auth/signup");
}

function signup(req, res) {}

function getLogin(req, res) {
  return res.render("customer/auth/login");
}

module.exports = {
  getSignup,
  getLogin,
  signup,
};
