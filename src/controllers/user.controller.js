import User from '../models/user.model';
import { ServerError, UnauthorizedError } from '../helpers/error.helper';

export async function createUser(req, res, next) {
  try {
    const { username, passwordHash } = req.body;
    const userId = await User.addUser({ username, password: passwordHash });

    req.user = { id: userId, username: username };
    next();
  } catch (err) {
    next(new ServerError());
  }
}

export function loginUser(req, res, next) {
  res.json({
    token: req.user.token
  });
}

export async function getUser(req, res, next) {
  try {
    const user = await User.getUser(req.body.username);

    if (user) {
      req.user = user;
      next();
    } else {
      next(new UnauthorizedError('Invalid Username'));
    }
  } catch (err) {
    next(new ServerError());
  }
}
