const errorHandler = (err, req, res, next) => {
  // Set the status code to 500 (server error)
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  // Send back a JSON object with the error message
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = { errorHandler };
