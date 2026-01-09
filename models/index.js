const sequelize = require('../config/database');
const Library = require('./library');
const Book = require('./book');
const User = require('./user'); 

Library.hasMany(Book, { 
    as: 'books',
    foreignKey: 'LibraryId',
    onDelete: 'CASCADE'
});

Book.belongsTo(Library, { 
    foreignKey: 'LibraryId',
    as: 'bibliotheque'
});

module.exports = {
    sequelize,
    Library,
    Book,
    User
};