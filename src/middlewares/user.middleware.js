import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ServerError, UnauthorizedError } from '../helpers/error.helper';

/**
 * Generate password hash.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function generatePassword(req, res, next) {
  bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS), (err, hash) => {
    if (err) {
      next(new ServerError(err.message));
    }
    req.body.passwordHash = hash;
    next();
  });
}

/**
 * Generate JWT with id and username encoded.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function generateToken(req, res, next) {
  jwt.sign(
    { id: req.user.id, username: req.user.username },
    process.env.JWT_KEY,
    { algorithm: 'HS256' },
    (err, token) => {
      if (err) {
        next(new ServerError(err.message));
      }
      req.user.token = token;
      next();
    }
  );
}

/**
 * Generate password hash and compare.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function validatePassword(req, res, next) {
  bcrypt.compare(req.body.password, req.user.password, (err, result) => {
    if (err) {
      next(new ServerError(err.message));
    }
    if (result) {
      next();
    } else {
      next(new UnauthorizedError('Invalid Password'));
    }
  });
}
