const { body, validationResult } = require('express-validator');

const validateLibrary = [
    body('nom')
        .trim() 
        .notEmpty().withMessage('Le nom de la bibliothèque est requis.')
        .isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères.')
        .escape(),

    body('adresse')
        .trim()
        .notEmpty().withMessage("L'adresse est requise.")
        .isLength({ min: 5 }).withMessage("L'adresse doit être valide (au moins 5 caractères)."),

    (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: "Données invalides",
                errors: errors.array() 
            });
        }
        
        next();
    }
];

module.exports = { validateLibrary };