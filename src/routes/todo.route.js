import express from 'express';
import * as TodoController from '../controllers/todo.controller';

const router = express.Router();

router.get('/', TodoController.listTodos);
router.post('/create', TodoController.createTodo);

export default router;
