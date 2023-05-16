import TokenHandler from '../helpers/tokenHandler.js';
import UserServices from '../services/userServices.js';

export default class SecureRoute {
  static async loginRequired(req, res, next) {
    const { headers } = req;
    const { authorization } = headers;
    if (authorization) {
      try {
        const authToken = authorization.split(' ');
        if (authToken[0] !== 'Bearer') {
          return res
            .status(401)
            .send({ msg: 'Unauthorized access. Login and try again' });
        }
        req.user = await TokenHandler.decodeToken(authToken[1]);
        if (req.user === 'jwt expired') {
          return res
            .status(401)
            .send({ message: 'Session expired. Please login again' });
        }
        return next();
      } catch (error) {
        return res.status(403).send({ message: error });
      }
    } else {
      return res.status(401).send({ message: 'No authorization headers' });
    }
  }

  static async isAdmin(req, res, next) {
    const { headers } = req;
    const { authorization } = headers;
    if (authorization) {
      try {
        const authToken = authorization.split(' ');
        const { email, id } = await TokenHandler.decodeToken(authToken[1]);
        const data = { _id: id, email: email };
        const userData = await UserServices.findUser(data);
        if (userData.role !== 'admin') {
          return res
            .status(401)
            .send({ message: 'You need ADMIN clearance for this operation' });
        }
        return next();
      } catch (error) {
        return res.status(403).send({ message: error });
      }
    } else {
      return res.status(401).send({ message: 'No authorization headers' });
    }
  }
}
