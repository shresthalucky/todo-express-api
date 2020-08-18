import express from 'express';

import * as TodoController from '../controllers/todo.controller';
import TodoValidator from '../validators/todo.validator';

const router = express.Router();

router.get('/', TodoController.listTodos);
router.post('/', TodoValidator, TodoController.createTodo);
router.delete('/:id', TodoController.deleteTodo);
router.put('/:id', TodoValidator, TodoController.updateTodo);

export default router;
