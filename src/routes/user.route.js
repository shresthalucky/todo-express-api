import express from 'express';
import * as userController from '../controllers/user.controller';
import * as userMiddleware from '../middlewares/user.middleware';

const router = express.Router();

router.post(
  '/register',
  userMiddleware.generatePassword,
  userController.createUser,
  userMiddleware.generateToken,
  userController.loginUser
);

export default router;
