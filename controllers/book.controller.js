const bookService = require('../services/book.service');
const logger = require('../services/logger.service');

class BookController {

    async create(req, res) {
        logger.log(req);
        try {
            const book = await bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        logger.log(req);
        try {
            const books = await bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        logger.log(req);
        try {
            const result = await bookService.deleteBook(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Livre non trouvé') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new BookController();