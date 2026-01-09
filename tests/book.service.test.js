const bookService = require('../services/book.service');
const { Book } = require('../models');

jest.mock('../models', () => ({
    Book: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    }
}));

describe('BookService', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createBook', () => {
        it('doit créer un livre', async () => {
            const newBook = { titre: 'Harry Potter', auteur: 'JK Rowling' };
            const savedBook = { id: 1, ...newBook };

            Book.create.mockResolvedValue(savedBook);

            const result = await bookService.createBook(newBook);
            
            expect(Book.create).toHaveBeenCalledWith(newBook);
            expect(result).toEqual(savedBook);
        });
    });

    describe('deleteBook', () => {
        it('doit supprimer un livre existant', async () => {
            const mockBookInstance = {
                id: 1,
                titre: 'Livre à supprimer',
                destroy: jest.fn().mockResolvedValue(true)
            };

            Book.findByPk.mockResolvedValue(mockBookInstance);

            const result = await bookService.deleteBook(1);

            expect(Book.findByPk).toHaveBeenCalledWith(1);
            expect(mockBookInstance.destroy).toHaveBeenCalled();
            expect(result).toEqual({ message: 'Livre supprimé' });
        });

        it('doit lancer une erreur si le livre n\'existe pas', async () => {
            Book.findByPk.mockResolvedValue(null); // Livre introuvable

            await expect(bookService.deleteBook(999))
                .rejects
                .toThrow('Livre non trouvé');
        });
    });
});