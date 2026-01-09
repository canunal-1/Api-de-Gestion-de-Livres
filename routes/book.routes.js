const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const { validateBook } = require('../validators/book.validator');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 * - name: Books
 * description: Gestion des livres
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - titre
 *         - auteur
 *         - LibraryId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         titre:
 *           type: string
 *         auteur:
 *           type: string
 *         LibraryId:
 *           type: integer
 *           description: ID de la bibliothèque d'appartenance
 *       example:
 *         titre: Les Misérables
 *         auteur: Victor Hugo
 *         LibraryId: 1
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Récupérer la liste de tous les livres
 *     tags: [Books]
 *     security: []
 *     responses:
 *       '200':
 *         description: Liste des livres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', bookController.getAll);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Ajouter un livre
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: Livre créé
 *       '400':
 *         description: Erreur de validation
 *       '401':
 *         description: Non authentifié
 */
router.post('/', authenticateToken, validateBook, bookController.create);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Supprimer un livre (Admin seulement)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du livre
 *     responses:
 *       '200':
 *         description: Livre supprimé
 *       '403':
 *         description: Accès interdit (Admin requis)
 *       '404':
 *         description: Livre non trouvé
 */
router.delete('/:id', authenticateToken, isAdmin, bookController.delete);

module.exports = router;