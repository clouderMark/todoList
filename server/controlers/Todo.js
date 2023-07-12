import TodoModel from '../models/Todo.js';
import AppError from '../errors/AppError.js';

class Todo {
  create(req, res, next) {
    try {
      const { title, value } = req.body;
      if (!title && !value) {
        throw new Error('Заметка пуста');
      }
      const todo = TodoModel.create(req.body);
      res.json(todo);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Todo();
