import * as UserService from '../services/user.service';

export async function createUser(req, res, next) {
  try {
    const { username, passwordHash } = req.body;
    const userId = await UserService.createUser(username, passwordHash);

    req.body.id = userId;
    next();
  } catch (err) {
    next(err);
  }
}

export function loginUser(req, res, next) {
  res.json({
    token: req.token,
    username: req.body.username
  });
}
