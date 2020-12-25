import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ServerError, UnauthorizedError } from '../helpers/error.helper';

export function customError(err) {
  return {
    statusCode: err.originalError && err.originalError.statusCode,
    message: err.message
  };
}

export function generatePassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, Number(process.env.SALT_ROUNDS), (err, hash) => {
      if (err) {
        reject(new ServerError(err.message));
      }

      resolve(hash);
    });
  });
}

export function validatePassword(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        reject(new ServerError(err.message));
      }
      if (result) {
        resolve();
      } else {
        reject(new UnauthorizedError('Invalid Password'));
      }
    });
  });
}

export function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: user.id, username: user.username }, process.env.JWT_KEY, { algorithm: 'HS256' }, (err, token) => {
      if (err) {
        reject(new ServerError(err.message));
      }
      resolve(token);
    });
  });
}

export function validateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        reject(new ServerError(err.message));
      }

      resolve(decoded);
    });
  });
}
