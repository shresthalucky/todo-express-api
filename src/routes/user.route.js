import express from 'express';

import * as UserController from '../controllers/user.controller';
import * as UserMiddleware from '../middlewares/user.middleware';
import UserValidator from '../validators/user.validator';
import { validateToken } from '../middlewares/helper.middleware';

const router = express.Router();

// route to only validate user token and response user information
router.get('/', validateToken, UserController.loginUser);

// route to register new user
router.post(
  '/register',
  UserValidator,
  UserMiddleware.generatePassword,
  UserController.createUser,
  UserMiddleware.generateToken,
  UserController.loginUser
);

// route to login user
router.post(
  '/login',
  UserValidator,
  UserController.getUser,
  UserMiddleware.validatePassword,
  UserMiddleware.generateToken,
  UserController.loginUser
);

export default router;
