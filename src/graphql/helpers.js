import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../helpers/error.helper';

export function customError(err) {
  const { statusCode, message } = err.originalError;

  return {
    statusCode: statusCode,
    message: message
  };
}

export function generatePassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, Number(process.env.SALT_ROUNDS), (err, hash) => {
      if (err) {
        reject(err);
      }

      resolve(hash);
    });
  });
}

export function validatePassword(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        reject(err);
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
        reject(err);
      }
      resolve(token);
    });
  });
}
