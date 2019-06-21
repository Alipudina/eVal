const express = require('express');
const testsRouter = express.Router();
const {createTests, evaluateTests, sendTests, getTestNames} = require('../middleware/testsMiddleware');
const { userCreateValidator } = require('../helpers/userCreateValidator');

testsRouter.post('/create', createTests);
testsRouter.get('/test', evaluateTests);
testsRouter.get('/emailsend', getTestNames);
// testsRouter.get('/showtest', getTestNames);

module.exports = testsRouter;
