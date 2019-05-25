const { check } = require('express-validator/check');
const makersModel = require('../models/makersModel');

const userCreateValidator = [
  check('userName')
    .trim( )
    .exists().withMessage('A name is necessary')
    .isLength({min: 6}).withMessage('The name must have a minimum of 6 characters')
    .escape(),

  check('password')
    .trim()
    .exists().withMessage('A password is necessary')
    .isLength({min:6}).withMessage('The password must have a minimum of 6 characters')
    .escape(),
];

module.exports = {userCreateValidator};
