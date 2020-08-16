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
  jwt.sign({ id: req.user.userId, username: req.user.username }, process.env.JWT_KEY, (err, token) => {
    if (err) {
      next(err);
    }
    req.user.token = token;
    next();
  });
}

export function validatePassword(req, res, next) {
  bcrypt.compare(req.body.password, req.user.password, (err, result) => {
    if (err) {
      next(err);
    }
    if (result) {
      next();
    } else {
      next(new Error('invalid password'));
    }
  });
}
