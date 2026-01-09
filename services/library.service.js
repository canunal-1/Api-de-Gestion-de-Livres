const { Library, Book } = require('../models');

class LibraryService {
    
    async createLibrary(data) {
        try {
            const library = await Library.create(data);
            return library;
        } catch (error) {
            throw new Error('Erreur lors de la création de la bibliothèque : ' + error.message);
        }
    }

    async getAllLibraries() {
        return await Library.findAll();
    }

    async getLibraryByIdWithBooks(id) {
        const library = await Library.findByPk(id, {
            include: [{
                model: Book,
                as: 'books'
            }]
        });

        if (!library) {
            throw new Error(`Bibliothèque avec l'ID ${id} non trouvée`);
        }

        return library;
    }

    async deleteLibrary(id) {
        const deletedCount = await Library.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            throw new Error(`Bibliothèque avec l'ID ${id} non trouvée`);
        }
        
        return deletedCount;
    }
}

module.exports = new LibraryService();