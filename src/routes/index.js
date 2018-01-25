const mainRouter = require('express').Router();
const authRouter = require('./auth');

mainRouter.use('/auth', authRouter);

module.exports = mainRouter;
