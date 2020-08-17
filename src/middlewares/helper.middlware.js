import jwt from 'jsonwebtoken';
import { ServerError, BadRequestError } from '../helpers/error.helper';

export function validateToken(req, res, next) {
  if (!req.headers.authorization) {
    next(new BadRequestError('Authorization token not provided'));
  }

  jwt.verify(req.headers.authorization, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      next(new ServerError());
    }
    req.user = decoded;
    next();
  });
}
