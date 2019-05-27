const express = require('express');
const testsRouter = express.Router();
const {createTests, evaluateTests} = require('../middleware/testsMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');

testsRouter.post('/create', createTests);
testsRouter.get('/test', evaluateTests);

module.exports = testsRouter;
