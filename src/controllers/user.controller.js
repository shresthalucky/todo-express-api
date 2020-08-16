import User from '../models/user.model';

export async function createUser(req, res, next) {
  try {
    const { username, passwordHash } = req.body;
    const userId = await User.addUser({ username, password: passwordHash });

    req.user = { id: userId, username: username };
    next();
  } catch (err) {
    next(err);
  }
}

export function loginUser(req, res, next) {
  res.json({
    token: req.user.token,
    username: req.user.username
  });
}

export async function getUser(req, res, next) {
  try {
    const user = await User.getUser(req.body.username);

    if (user) {
      req.user = user;
    } else {
      next(new Error('user not found'));
    }
    next();
  } catch (err) {
    next(err);
  }
}
