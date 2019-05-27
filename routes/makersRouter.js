const express = require('express');
const makersRouter = express.Router();
const {  loginMakers, handleValidationErrors, createMakers} = require('../middleware/makersMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');


makersRouter.post('/signin', userCreateValidator, handleValidationErrors, createMakers);
makersRouter.post('/login', handleValidationErrors, loginMakers);


module.exports = makersRouter;
