import jwt from 'jsonwebtoken';
import { BadRequestError } from '../helpers/error.helper';

export function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    next(new BadRequestError('Authorization token not provided'));
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      next(new BadRequestError('Invalid Token'));
    }
    req.user = decoded;
    req.user.token = token;
    next();
  });
}
