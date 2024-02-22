function notFoundMiddleware(req, res) {
  res.status(404).render("shared/404");
}

module.exports = notFoundMiddleware;
