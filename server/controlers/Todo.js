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

  update(req, res, next) {
    try {
      const { email, id, title, value } = req.body;

      if (!email || !id || !title || !value) {
        throw new Error('Чего-то не хватает');
      }

      const newTodo = TodoModel.update(req.body);

      res.json(newTodo);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Todo();
