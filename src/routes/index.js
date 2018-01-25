const mainRouter = require('express').Router();
const userRouter = require('./user');

mainRouter.use('/auth', userRouter);

module.exports = mainRouter;
