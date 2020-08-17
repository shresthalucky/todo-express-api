import HttpStatus from 'http-status-codes';

import * as TodoService from '../services/todo.service';
import { DatabaseError } from '../helpers/error.helper';

export async function createTodo(req, res, next) {
  try {
    const todoId = await TodoService.createTodo(req.body, req.user.id);
    const todo = await TodoService.getTodo(todoId, req.user.id);

    res.status(HttpStatus.CREATED).json(todo);
  } catch (err) {
    next(new DatabaseError());
  }
}

export async function listTodos(req, res, next) {
  try {
    const todos = await TodoService.listTodos(req.user.id);

    res.status(HttpStatus.OK).json(todos);
  } catch (err) {
    next(new DatabaseError());
  }
}

export function deleteTodo(req, res, next) {
  TodoService.deleteTodo(req.params.id, req.user.id)
    .then(res.status(HttpStatus.NO_CONTENT).end())
    .catch(() => next(new DatabaseError()));
}

export async function updateTodo(req, res, next) {
  try {
    await TodoService.updateTodo(req.body, req.params.id, req.user.id);
    const todo = await TodoService.getTodo(req.params.id, req.user.id);

    res.status(HttpStatus.CREATED).json(todo);
  } catch (err) {
    next(new DatabaseError());
  }
}
