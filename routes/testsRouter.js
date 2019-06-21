const express = require('express');
const testsRouter = express.Router();
const {createTests, evaluateTests, sendTests, getTestNames} = require('../middleware/testsMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');

testsRouter.post('/create', createTests);
testsRouter.get('/test', evaluateTests);
testsRouter.get('/send', sendTests);
testsRouter.get('/testPage', getTestNames);

module.exports = testsRouter;
