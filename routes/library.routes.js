const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library.controller');
const { validateLibrary } = require('../validators/library.validator');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 * - name: Libraries
 * description: Gestion des bibliothèques
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Library:
 *       type: object
 *       required:
 *         - nom
 *         - adresse
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         nom:
 *           type: string
 *           description: Le nom de la bibliothèque
 *         adresse:
 *           type: string
 *           description: L'adresse physique
 *       example:
 *         nom: Grande Bibliothèque
 *         adresse: 12 Rue de la Paix, Paris
 */

/**
 * @swagger
 * /libraries:
 *   get:
 *     summary: Récupérer toutes les bibliothèques
 *     tags: [Libraries]
 *     security: []
 *     responses:
 *       '200':
 *         description: Liste des bibliothèques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Library'
 */
router.get('/', libraryController.getAll);

/**
 * @swagger
 * /libraries/{id}:
 *   get:
 *     summary: Récupérer une bibliothèque et ses livres
 *     tags: [Libraries]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la bibliothèque
 *     responses:
 *       '200':
 *         description: Détails de la bibliothèque avec la liste des livres
 *       '404':
 *         description: Bibliothèque non trouvée
 */
router.get('/:id', libraryController.getOneWithBooks);

/**
 * @swagger
 * /libraries:
 *   post:
 *     summary: Créer une nouvelle bibliothèque
 *     tags: [Libraries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Library'
 *     responses:
 *       '201':
 *         description: Bibliothèque créée
 *       '400':
 *         description: Erreur de validation
 *       '401':
 *         description: Non authentifié
 */
router.post('/', authenticateToken, validateLibrary, libraryController.create);

/**
 * @swagger
 * /libraries/{id}:
 *   delete:
 *     summary: Supprimer une bibliothèque (Admin seulement)
 *     tags: [Libraries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la bibliothèque à supprimer
 *     responses:
 *       '200':
 *         description: Bibliothèque supprimée
 *       '403':
 *         description: Accès interdit (Admin requis)
 */
router.delete('/:id', authenticateToken, isAdmin, libraryController.delete);

module.exports = router;