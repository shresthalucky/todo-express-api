import express from 'express';

import * as TodoController from '../controllers/todo.controller';
import TodoValidator from '../validators/todo.validator';

const router = express.Router();

// route to list of todos
router.get('/', TodoController.listTodos);

// route to create a new todo
router.post('/', TodoValidator, TodoController.createTodo);

// route to delete a todo
router.delete('/:id', TodoController.deleteTodo);

// route to update a todo
router.put('/:id', TodoValidator, TodoController.updateTodo);

export default router;
