const express = require('express');
const testsRouter = express.Router();
const {createTests, evaluateTests, sendTests} = require('../middleware/testsMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');

testsRouter.post('/create', createTests);
testsRouter.get('/test', evaluateTests);
testsRouter.get('/send', sendTests);

module.exports = testsRouter;
