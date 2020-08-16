import jwt from 'jsonwebtoken';
import { ServerError } from '../helpers/error.helper';

export function validateToken(req, res, next) {
  jwt.verify(req.headers.authorization, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      next(new ServerError());
    }
    req.user = decoded;
    next();
  });
}
