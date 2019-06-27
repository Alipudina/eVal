const express = require('express');
const testsRouter = express.Router();
const {createTests, evaluateTests, getTestNames, showTest, sendTests, leadToLandingPage} = require('../middleware/testsMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');

testsRouter.post('/create', createTests);
testsRouter.get('/test', evaluateTests);
testsRouter.get('/emailsend', getTestNames);
testsRouter.post('/emailsend', sendTests);
testsRouter.get('/showtest', showTest);
testsRouter.get('/testThroughEmail/:testName', leadToLandingPage);

module.exports = testsRouter;
