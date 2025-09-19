 // Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login.html');
};

// Middleware to check if user has student role
exports.isStudent = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'student') {
    return next();
  }
  res.redirect('/unauthorized.html');
};

// Middleware to check if user has institute role
exports.isInstitute = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'institute') {
    return next();
  }
  res.redirect('/unauthorized.html');
};