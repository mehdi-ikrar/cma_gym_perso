import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const token = req.cookies?.token || req.headers['authorization'];
  const jwtSecret = process.env.JWT_SECRET || 'dev_secret_key';
  if (!token) {
    req.user = null;
    return res.redirect('/401');
  }
  try {
    const realToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(realToken, jwtSecret);
    req.user = decoded;
    res.locals.user = decoded;
    next();
  } catch (err) {
    req.user = null;
    res.locals.user = null;
    return res.redirect('/login');
  }
}
