const createError = require("http-errors");

function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found!"));
}

module.exports = { notFoundHandler };
