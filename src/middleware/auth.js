const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'No token provided',
        message: 'Authorization header is required'
      });
    }

    const parts = authHeader.split(' ');
    
    if (parts.length !== 2) {
      return res.status(401).json({ 
        error: 'Token error',
        message: 'Token format must be: Bearer [token]'
      });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ 
        error: 'Token malformatted',
        message: 'Token format must be: Bearer [token]'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          error: 'Token invalid',
          message: 'Failed to authenticate token'
        });
      }

      req.userId = decoded.id;
      req.userEmail = decoded.email;
      return next();
    });
  } catch (error) {
    return res.status(401).json({ 
      error: 'Token invalid',
      message: 'Authentication failed'
    });
  }
};

module.exports = authMiddleware;
