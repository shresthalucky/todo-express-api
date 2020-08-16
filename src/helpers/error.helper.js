class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message || 'Not Found', 404);
  }
}

export class UsernameTakenError extends AppError {
  constructor(message) {
    super(message || 'Invalid Username', 500);
  }
}

export class ServerError extends AppError {
  constructor(message) {
    super(message || 'Internal Server Error', 500);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(message || 'Unathorized', 401);
  }
}
