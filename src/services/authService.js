const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthService {
  async register(username, email, password) {
    const existingUser = await User.findOne({ 
      where: { 
        [require('sequelize').Op.or]: [{ email }, { username }] 
      } 
    });
    
    if (existingUser) {
      throw new Error('User already exists with this email or username');
    }

    const user = await User.create({ username, email, password });
    const token = this.generateToken(user);
    
    return { user: { id: user.id, username: user.username, email: user.email }, token };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await user.validatePassword(password);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    
    return { user: { id: user.id, username: user.username, email: user.email }, token };
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }
}

module.exports = new AuthService();
