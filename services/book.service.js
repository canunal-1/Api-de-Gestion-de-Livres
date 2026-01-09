const { Book } = require('../models');

class BookService {
    
    async createBook(data) {
        try {
            const book = await Book.create(data);
            return book;
        } catch (error) {
            throw new Error('Impossible de créer le livre : ' + error.message);
        }
    }

    async deleteBook(id) {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Livre non trouvé');
        }
        await book.destroy();
        return { message: 'Livre supprimé' };
    }

    async getAllBooks() {
        return await Book.findAll();
    }
}

module.exports = new BookService();