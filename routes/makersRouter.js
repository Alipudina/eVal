const express = require('express');
const makersRouter = express.Router();
const {  loginMakers, handleValidationErrors, authorization, createMakers, logoutMakers } = require('../middleware/makersMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');


makersRouter.post('/signin', userCreateValidator, handleValidationErrors, createMakers);
makersRouter.post('/login', handleValidationErrors, loginMakers);
makersRouter.get('/logout', logoutMakers);


module.exports = makersRouter;
