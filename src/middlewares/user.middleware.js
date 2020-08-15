import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function generatePassword(req, res, next) {
  bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS), (err, hash) => {
    if (err) {
      next(err);
    }
    req.body.passwordHash = hash;
    next();
  });
}

export function generateToken(req, res, next) {
  jwt.sign({ id: req.body.userId, username: req.body.username }, process.env.JWT_KEY, (err, token) => {
    if (err) {
      next(err);
    }
    req.token = token;
    next();
  });
}
