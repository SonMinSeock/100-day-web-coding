function addCsrfToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken(); // CSRF 토큰 생성.
  next();
}

module.exports = addCsrfToken;
