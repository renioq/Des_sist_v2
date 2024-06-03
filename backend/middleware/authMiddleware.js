const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware para proteger rotas e verificar o token JWT
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secrectKey');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Não autorizado, token falhou' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

// Tentei aplicar o middleware para evitar atualizações de usuários por não adminstradores.

module.exports = protect;
