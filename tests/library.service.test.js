const libraryService = require('../services/library.service');
const { Library, Book } = require('../models');

jest.mock('../models', () => ({
    Library: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    },
    Book: {}
}));

describe('LibraryService', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createLibrary', () => {
        it('doit créer une bibliothèque avec succès', async () => {
            const mockData = { nom: 'Bibliothèque Test', adresse: 'Rue du Test' };
            const mockResult = { id: 1, ...mockData };

            Library.create.mockResolvedValue(mockResult);

            const result = await libraryService.createLibrary(mockData);

            expect(Library.create).toHaveBeenCalledWith(mockData);
            expect(result).toEqual(mockResult);
        });

        it('doit lancer une erreur si la création échoue', async () => {
            const errorMessage = 'Erreur DB';
            Library.create.mockRejectedValue(new Error(errorMessage));

            await expect(libraryService.createLibrary({ nom: 'A', adresse: 'B' }))
                .rejects
                .toThrow('Erreur lors de la création de la bibliothèque : ' + errorMessage);
        });
    });

    describe('getAllLibraries', () => {
        it('doit retourner toutes les bibliothèques', async () => {
            const mockLibraries = [{ id: 1, nom: 'Lib A' }, { id: 2, nom: 'Lib B' }];
            Library.findAll.mockResolvedValue(mockLibraries);

            const result = await libraryService.getAllLibraries();

            expect(Library.findAll).toHaveBeenCalled();
            expect(result).toHaveLength(2);
            expect(result).toEqual(mockLibraries);
        });
    });

    describe('getLibraryByIdWithBooks', () => {
        it('doit retourner une bibliothèque si elle existe', async () => {
            const mockLibrary = { id: 1, nom: 'Lib A', books: [] };
            Library.findByPk.mockResolvedValue(mockLibrary);

            const result = await libraryService.getLibraryByIdWithBooks(1);

            expect(Library.findByPk).toHaveBeenCalledWith(1, {
                include: [{ model: Book, as: 'books' }]
            });
            expect(result).toEqual(mockLibrary);
        });

        it('doit lancer une erreur si la bibliothèque n\'existe pas', async () => {
            Library.findByPk.mockResolvedValue(null);

            await expect(libraryService.getLibraryByIdWithBooks(999))
                .rejects
                .toThrow("Bibliothèque avec l'ID 999 non trouvée");
        });
    });
});