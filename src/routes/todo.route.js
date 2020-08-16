import express from 'express';
import * as TodoController from '../controllers/todo.controller';
import { validateToken } from '../middlewares/helper.middlware';

const router = express.Router();

router.use(validateToken);

router.post('/create', TodoController.createTodo);

export default router;
