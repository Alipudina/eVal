const express = require('express');
const testsRouter = express.Router();
const {createTests, evaluateTests, getTestNames, showTest} = require('../middleware/testsMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');

testsRouter.post('/create', createTests);
testsRouter.get('/test', evaluateTests);
testsRouter.get('/emailsend', getTestNames);
testsRouter.get('/showtest', showTest);

module.exports = testsRouter;
