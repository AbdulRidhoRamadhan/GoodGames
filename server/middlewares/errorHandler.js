function errorHandler(err, req, res, next) {
  console.log(err, "<<<<< dari error handler");

  let status = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "EMAIL_REQUIRED") {
    status = 400;
    message = "Email is required";
  } else if (err.name === "PASS_REQUIRED") {
    status = 400;
    message = "Password is required";
  } else if (err.name === "UNAUTHENTICATED") {
    status = 401;
    message = "Invalid email or password";
  } else if (err.name === "NOT_FOUND") {
    status = 404;
    message = "Data not found";
  } else if (err.name === "FORBIDDEN") {
    status = 403;
    message = "You don't have access";
  } else if (err.name === "UNAUTHORIZED" || err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  } else if (err.name === "googlelogin") {
    status = 401;
    message = "Invalid google login";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
