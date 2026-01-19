const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          message: 'Username, email, and password are required' 
        });
      }

      const result = await authService.register(username, email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      debugger;
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          message: 'Email and password are required' 
        });
      }

      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async validate(req, res) {
    res.json({ 
      valid: true, 
      userId: req.userId,
      email: req.userEmail,
      message: 'Token is valid' 
    });
  }
}

module.exports = new AuthController();
