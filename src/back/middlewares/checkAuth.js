// middlewares/checkAuth.js
import jwt from 'jsonwebtoken';

export function checkAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.locals.admin = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_key');
    req.admin = decoded;
    res.locals.admin = decoded;
  } catch (err) {
    console.error('Token invalide :', err.message);
    res.locals.admin = null;
  }

  next();
}
