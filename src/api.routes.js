import express from 'express';
import { validateToken } from './middlewares/helper.middlware';
import UserRouter from './routes/user.route';
import TodoRouter from './routes/todo.route';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/todos', validateToken, TodoRouter);

export default router;
