const express = require('express');
const testsRouter = express.Router();
const {createTests, evaluateTests, sendTests, getTestNames} = require('../middleware/testsMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');

testsRouter.post('/create', createTests);
// testsRouter.get('/create', getTestNames);
testsRouter.get('/test', evaluateTests);
testsRouter.get('/send', sendTests);
testsRouter.get('/testpage', getTestNames);

module.exports = testsRouter;
