class LoggerService {
    /**
     * @param {Object} req - L'objet requête d'Express
     */
    log(req) {

        const date = new Date().toISOString();
        
        console.log(`[Logger] ${date} | ${req.method} ${req.originalUrl}`);
    }
}

module.exports = new LoggerService();