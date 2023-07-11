import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

const makeJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class User {
  async signup(req, res, next) {
    const { email, password, role = 'USER' } = req.body;
    try {
      if (!email || !password) {
        throw new Error('Пустой email или пароль');
      }
      if (role !== 'USER') {
        throw new Error('Возможна только роль USER');
      }
      const hash = await bcrypt.hash(password, 5);
      const user = await UserModel.create({ email, password: hash, role });
      const token = makeJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = UserModel.getByEmail(email);
      let compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        throw new Error('Указан неверный пароль');
      }
      const token = makeJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  check(req, res, next) {
    const token = makeJwt(req.auth.id, req.auth.email, req.auth.role);
    return res.json({ token });
  }
}

export default new User();
