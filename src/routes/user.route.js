import express from 'express';
import * as UserController from '../controllers/user.controller';
import * as UserMiddleware from '../middlewares/user.middleware';

const router = express.Router();

router.post(
  '/register',
  UserMiddleware.generatePassword,
  UserController.createUser,
  UserMiddleware.generateToken,
  UserController.loginUser
);

router.post(
  '/login',
  UserController.getUser,
  UserMiddleware.validatePassword,
  UserMiddleware.generateToken,
  UserController.loginUser
);

export default router;
