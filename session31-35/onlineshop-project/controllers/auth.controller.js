function getSignup(req, res) {
  return res.send("<h1>Signup</h1>");
}

function getLogin(req, res) {
  return res.send("<h1>Login</h1>");
}

module.exports = {
  getSignup,
  getLogin,
};
