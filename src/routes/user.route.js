import express from 'express';

import * as UserController from '../controllers/user.controller';
import * as UserMiddleware from '../middlewares/user.middleware';
import UserValidator from '../validators/user.validator';
import { validateToken } from '../middlewares/helper.middlware';

const router = express.Router();

router.get('/', validateToken, UserController.loginUser);

router.post(
  '/register',
  UserValidator,
  UserMiddleware.generatePassword,
  UserController.createUser,
  UserMiddleware.generateToken,
  UserController.loginUser
);

router.post(
  '/login',
  UserValidator,
  UserController.getUser,
  UserMiddleware.validatePassword,
  UserMiddleware.generateToken,
  UserController.loginUser
);

export default router;
