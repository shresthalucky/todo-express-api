import HttpStatus from 'http-status-codes';

import * as UserService from '../services/user.service';
import { DatabaseError, UnauthorizedError } from '../helpers/error.helper';

/**
 * Create a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function createUser(req, res, next) {
  try {
    const { username, passwordHash } = req.body;
    const userId = await UserService.createUser(username, passwordHash);

    req.user = { id: userId, username: username };
    next();
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      next(new DatabaseError('Username already taken'));
    }
    next(new DatabaseError());
  }
}

/**
 * Successful user login response.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function loginUser(req, res, next) {
  res.status(HttpStatus.ACCEPTED).json({
    token: req.user.token,
    id: req.user.id,
    username: req.user.username
  });
}

/**
 * Add user detail to request.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function getUser(req, res, next) {
  try {
    const user = await UserService.getUser(req.body.username);

    if (user) {
      req.user = user;
      next();
    } else {
      next(new UnauthorizedError('Invalid Username'));
    }
  } catch (err) {
    next(new DatabaseError());
  }
}
