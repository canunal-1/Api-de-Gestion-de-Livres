const authService = require('../services/auth.service');
const logger = require('../services/logger.service');

class AuthController {
    
    async register(req, res) {
        logger.log(req);
        try {
            const { email, password, role } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ message: "Email et mot de passe requis." });
            }
            const user = await authService.register(email, password, role);
            res.status(201).json({ message: "Utilisateur créé avec succès", user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        logger.log(req);
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email et mot de passe requis." });
            }

            const token = await authService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();