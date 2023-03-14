import jwt from 'jsonwebtoken';
import config from '../config';

export default class TokenHelper {
  // export const createToken = async (payload) => {
  //     const token = await jwt.sign(payload, config.JWTSECRETKEY, {
  //         expiresIn: '1d',
  //     });
  //     return token;
  // };
  static async createToken(payload) {
    const token = await jwt.sign(payload, config.JWTSECRETKEY, {
      expiresIn: '1d',
    });
    return token;
  }

  static async decodeToken(token) {
    try {
      const decoded = await jwt.verify(token, config.JWTSECRETKEY);
      return decoded;
    } catch (e) {
      return e.message || 'Error decoding token';
    }
  }
}
