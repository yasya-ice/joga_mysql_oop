const authRequired = (req, res, next) => {
  if (req.session?.user) return next();
  return res.status(401).json({ error: 'Not authenticated' });
};

const requireRole = (role) => (req, res, next) => {
  const roles = req.session?.user?.roles;
  console.log('Session User:', req.session?.user);
  if (!roles) return res.status(401).json({ error: 'Not authenticated user' });
  console.log('User Roles:', roles);
  console.log('Required Role:', role);
  console.log('Role Check:', roles.includes(role));
  if (!roles.includes(role)) return res.status(403).json({ error: 'Forbidden' });
  next();
};

module.exports = { authRequired, requireRole };