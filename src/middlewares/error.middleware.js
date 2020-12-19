import { NotFoundError } from '../helpers/error.helper';

/**
 * Send error response.
 *
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function handleError(err, req, res, next) {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    statusCode: statusCode,
    message: message
  });
}

/**
 * Send page not found response.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function handleNotFound(req, res, next) {
  const { statusCode, message } = new NotFoundError();

  res.status(statusCode).json({
    statusCode: statusCode,
    message: message
  });
}
