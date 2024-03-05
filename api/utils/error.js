const errorHandler = (statusCode, message) => {
  // Using JS Error Constructor for Creating An Error
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

module.exports = errorHandler;
