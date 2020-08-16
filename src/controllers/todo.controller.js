import * as TodoService from '../services/todo.service';
import { ServerError } from '../helpers/error.helper';

export async function createTodo(req, res, next) {
  try {
    const todoId = await TodoService.createTodo(req.body, req.user.id);
    const todo = await TodoService.getTodo(todoId, req.user.id);

    res.status(201).json(todo);
  } catch (err) {
    next(new ServerError());
  }
}

export async function listTodos(req, res, next) {
  try {
    const todos = await TodoService.listTodos(req.user.id);

    res.status(200).json(todos);
  } catch (err) {
    next(new ServerError());
  }
}
