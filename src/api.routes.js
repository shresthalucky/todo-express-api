import express from 'express';
import HttpStatus from 'http-status-codes';

import { validateToken } from './middlewares/helper.middleware';
import UserRouter from './routes/user.route';
import TodoRouter from './routes/todo.route';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(HttpStatus.OK).json({
    message: 'Affirmative'
  });
});

router.use('/users', UserRouter);
router.use('/todos', validateToken, TodoRouter);

export default router;
