const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
};

middlewareObj.isLogged = function(req, res, next) {
  if (!req.session.user) {
    return next();
  }

  res.redirect("/user");
};

// Authentictaed ---> isAdmin
middlewareObj.isAdmin = function(req, res, next) {
  if (!req.session.user.isAdmin) {
    res.status(401).send({ error: true, message: "Unauthorized" });
  }
  next();
};

module.exports = middlewareObj;
