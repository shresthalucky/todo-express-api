import express from 'express';
import * as TodoController from '../controllers/todo.controller';

const router = express.Router();

router.get('/', TodoController.listTodos);
router.post('/', TodoController.createTodo);
router.delete('/:id', TodoController.deleteTodo);
router.patch('/:id', TodoController.updateTodo);

export default router;
