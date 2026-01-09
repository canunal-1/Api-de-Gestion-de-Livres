const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_KEY } = require('../middlewares/auth.middleware');

class AuthService {
    
    async register(email, password, role = 'user') {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Cet email est déjà utilisé.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            role 
        });

        return { id: newUser.id, email: newUser.email, role: newUser.role };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Email ou mot de passe incorrect.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Email ou mot de passe incorrect.');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        return token;
    }
}

module.exports = new AuthService();