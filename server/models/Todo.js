import AppError from '../errors/AppError.js';
import { data } from './data.js';
import { v4 as uuid } from 'uuid';

const TodoMapping = data;

class User {
  create(data) {
    const { title, value, email } = data;
    const user = TodoMapping.find((el) => el.email === email);

    if (!user) {
      throw new Error('Пользователь не существует');
    }

    const newTodo = { title, value, completed: false, id: uuid() };

    if ('todo' in user) {
      user.todo.push(newTodo);
    } else {
      user.todo = [newTodo];
    }

    return newTodo;
  }

  getAll(data) {
    const { email } = data;

    const user = TodoMapping.find((el) => el.email === email);

    if (!('todo' in user)) {
      user.todo = [];
    }

    return user.todo;
  }

  update(data) {
    const { email, id, title, value, completed } = data;

    const user = TodoMapping.find((el) => el.email === email);

    const todo = user.todo.find((el) => el.id === id)
    if (todo) {
      todo.title = title;
      todo.value = value;
      todo.completed = completed;
    }

    return todo;
  }

  delete(data) {
    const { email, id } = data;

    const user = TodoMapping.find((el) => el.email === email);

    user.todo = user.todo.filter((el) => el.id !== id)

    return {id};
  }
}

export default new User();
