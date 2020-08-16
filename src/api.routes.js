import express from 'express';
import UserRouter from './routes/user.route';
import TodoRouter from './routes/todo.route';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/todos', TodoRouter);

export default router;
