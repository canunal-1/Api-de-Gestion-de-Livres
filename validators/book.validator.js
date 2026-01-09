const { body, validationResult } = require('express-validator');

const validateBook = [
    body('titre').trim().notEmpty().withMessage('Le titre est requis.'),
    body('auteur').trim().notEmpty().withMessage("L'auteur est requis."),
    body('LibraryId').isInt().withMessage("L'ID de la bibliothèque (LibraryId) doit être un entier valide."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateBook };