function protectRoutesMiddleware(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }
  console.log(req.path);
  console.log(req.path.startsWith("/admin"));

  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");
  }
  next();
}

module.exports = protectRoutesMiddleware;
