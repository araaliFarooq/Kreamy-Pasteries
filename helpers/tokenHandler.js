import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export default class TokenHandler {
  static async createToken(payload) {
    const token = await jwt.sign(payload, config.JWT_SECRETKEY, {
      expiresIn: '1d',
    });
    return token;
  }

  static async decodeToken(token) {
    try {
      const decoded = await jwt.verify(token, config.JWT_SECRETKEY);
      return decoded;
    } catch (e) {
      return e.message || 'Error decoding token';
    }
  }
}
