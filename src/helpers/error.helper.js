import HttpStatus from 'http-status-codes';

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message || 'Not Found', HttpStatus.NOT_FOUND);
  }
}

export class ServerError extends AppError {
  constructor(message) {
    super(message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(message || 'Unathorized', HttpStatus.UNAUTHORIZED);
  }
}

export class DatabaseError extends AppError {
  constructor(message) {
    super(message || 'Database Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class BadRequestError extends AppError {
  constructor(message) {
    super(message || 'Bad Request', HttpStatus.BAD_REQUEST);
  }
}
