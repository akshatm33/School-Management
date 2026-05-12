class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    err.statusCode = 400;
    err.message = message;
  }

  if (err.name === 'CastError') {
    err.statusCode = 400;
    err.message = 'Invalid ID format';
  }

  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
    err.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'Token expired';
  }

  // Handle database-specific errors
  if (err.code === 'ER_DUP_ENTRY') {
    err.statusCode = 409;
    err.message = 'Duplicate entry - record already exists';
  }

  if (err.code === 'ER_BAD_FIELD_ERROR') {
    err.statusCode = 500;
    err.message = 'Database field error';
  }

  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    err.statusCode = 503;
    err.message = 'Database connection lost';
  }

  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
    err.statusCode = 503;
    err.message = 'Database error';
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const catchAsyncErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const validateRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required',
      statusCode: 400,
    });
  }
  next();
};

module.exports = {
  AppError,
  errorHandler,
  catchAsyncErrors,
  validateRequestBody,
};
