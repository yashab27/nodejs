const userRoutes = require('./users');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('Welcome to my api-server');
    });

    userRoutes(app, fs);
};

module.exports = appRouter;