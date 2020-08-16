import { NotFoundError } from '../helpers/error.helper';

export function handleError(err, req, res, next) {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    statusCode: statusCode,
    message: message
  });
}

export function handleNotFound(req, res, next) {
  const { statusCode, message } = new NotFoundError();

  res.status(statusCode).json({
    statusCode: statusCode,
    message: message
  });
}
