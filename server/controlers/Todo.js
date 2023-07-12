import TodoModel from '../models/Todo.js';
import AppError from '../errors/AppError.js';

class Todo {
  create(req, res, next) {
    try {
      const { title, value, email } = req.body;
      if (!title && !value) {
        throw new Error('Заметка пуста');
      }
      if (!email) {
        throw new Error('Вы не зарегистрированы');
      }

      const todo = TodoModel.create(req.body);
      res.json(todo);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  getAll(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new Error('Вы не зарегистрированы');
      }

      const todos = TodoModel.getAll(req.body);

      res.json(todos);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Todo();
