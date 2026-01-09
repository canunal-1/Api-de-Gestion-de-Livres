const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger'); 
const { sequelize } = require('./models');

const libraryRoutes = require('./routes/library.routes');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes'); 

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api/auth', authRoutes);
app.use('/api/libraries', libraryRoutes);
app.use('/api/books', bookRoutes); 

sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de données synchronisée.');
        console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erreur DB:', err);
    });