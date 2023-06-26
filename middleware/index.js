let middlewareObject = {};

//a middleware to check if a user is logged in or not
middlewareObject.isNotLoggedIn = (req, res, next) => {
  console.log("its from middleware:");
  console.log(req.user);
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/signin");
};

// Middleware to check if email is verified
middlewareObject.isEmailVerified = (req, res, next) => {
  // Check if email is verified
  if (req.user.isEmailVerified) {
    return next(); // Email is verified, proceed to next middleware/route handler
  }

  // Email is not verified, redirect to /emailVerification
  res.redirect("/emailVerification");
};

// Middleware to check if email is not verified
middlewareObject.isNotEmailVerified = (req, res, next) => {
  // Check if email is not verified
  if (!req.user.isEmailVerified) {
    res.redirect("/emailVerification"); // Email is not verified, redirect to /emailVerification
  } else {
    next(); // Email is verified, let them stay where they are
  }
};


module.exports = middlewareObject;
