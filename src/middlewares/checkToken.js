import { ForbiddenError } from '../utils/errors.js';
import jwt from '../utils/jwt.js';

export default (req, _, next) => {
  try {
    if (req.url == '/login' || req.url == '/register' || req.url == '/test') {
      return next();
    }

    let { token } = req.headers;

    if (!token) {
      return next(new ForbiddenError(403, 'token required'));
    }

    let { userId } = jwt.verify(token);

    req.userId = userId;

    return next();
  } catch (e) {
    return next(new ForbiddenError(403, e.message));
  }
}
