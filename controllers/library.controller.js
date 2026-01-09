const libraryService = require('../services/library.service');
const logger = require('../services/logger.service');

class LibraryController {

    async create(req, res) {
        logger.log(req);
        try {
            const { nom, adresse } = req.body;
            
            const newLibrary = await libraryService.createLibrary({ nom, adresse });
            res.status(201).json(newLibrary);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        logger.log(req);
        try {
            const libraries = await libraryService.getAllLibraries();
            res.status(200).json(libraries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOneWithBooks(req, res) {
        logger.log(req);
        try {
            const id = req.params.id;
            const library = await libraryService.getLibraryByIdWithBooks(id);
            res.status(200).json(library);
        } catch (error) {

            if (error.message.includes('non trouvée')) {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        logger.log(req);
        try {
            const id = req.params.id;
            await libraryService.deleteLibrary(id); 
            res.status(200).json({ message: "Librairie supprimée avec succès." });
        } catch (error) {
            if (error.message && error.message.includes('non trouvée')) {
                return res.status(404).json({ message: "Librairie introuvable." });
            }
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new LibraryController();