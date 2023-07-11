import AppError from '../errors/AppError.js';

const UserMapping = [
];

class User {
  getByEmail(email) {
    const user = UserMapping.find((el) => el.email === email);
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return user;
  }

  async create(data) {
    const { email, password, role } = data;
    const check = await UserMapping.find((el) => el.email === email);
    if (check) {
      throw new Error('Пользователь уже существует');
    }
    UserMapping.push({ email, password, role });

    return { email, password, role };
  }
}

export default new User();
