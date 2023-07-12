import AppError from '../errors/AppError.js';
import { data } from './data.js';

const TodoMapping = data;

class User {
  create(data) {
    const { title, value, email } = data;
    const user = TodoMapping.find((el) => el.email === email);

    if (!user) {
      throw new Error('Пользователь не существует');
    }

    if ('todo' in user) {
      user.todo.push({ title, value, completed: false });
    } else {
      user.todo = [{ title, value, completed: false }];
    }

    return { title, value, completed: false };
  }

  getAll(data) {
    const { email } = data;

    const user = TodoMapping.find((el) => el.email === email);

    if (!('todo' in user)) {
      user.todo = [];
    }

    return user.todo;
  }
}

export default new User();
