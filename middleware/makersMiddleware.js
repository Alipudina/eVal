const makersModel = require('../models/makersModel');
const {validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const saltRounds = parseInt(process.env.SALT_ROUNDS);


const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({errors: validationErrors.array()});
  }
  next();
}

const authorization = async (req, res, next) => {
  try {
    const tokenCookie = req.cookies.authToken.split(' ')[1];
    await jwt.verify(tokenCookie, process.env.SECRET);
    req.token = tokenCookie;

    next();
  }catch (error) {
    next(error);
  }
}

const createMakers = async (req, res, next)=>{
  try{
    const createMaker = await makersModel.findOne({userName: req.body.userName});
    const createEmail = await makersModel.findOne({userEmail:req.body.userEmail});
    if (createMaker){
      return res.status(404).json({msg:'That name is already taken'});
    } else if (createEmail) {
        return res.status(404).json({msg:'That email is already taken'});
          }

    req.body.password = await bcrypt.hash(req.body.password, saltRounds);

    await makersModel.create(req.body);

    res.status(200).json({msg:'Profile created succesfully'});

  }catch(error){
    next(error);
  }
}
const loginMakers = async (req, res, next) => {
  try {
    const findMaker = await makersModel.findOne({userName: req.body.userName});

    if (!findMaker) {
      return res.status(404).json({msg: 'Maker does not exist'});
    }

    const checkPasswordsMatch = await bcrypt.compare(req.body.password, findMaker.password);;

    if (!checkPasswordsMatch) {
      return res.status(400).json({msg: 'Password is incorrect'});
    }

    const token = await jwt.sign({userName: findMaker.userName}, process.env.SECRET);
    res.cookie('authToken', token, {httpOnly: true});
    res.status(200).json({userName: findMaker.userName});

  }catch (error) {
    next(error);
  }
}

const logoutMakers = async (req, res, next)=>{
  try{
    const inputToken = req.cookies.authToken;
    await jwt.verify(inputToken, process.env.SECRET);
    res.clearCookie('authToken')
    res.status(200).json('The user has succesfully logged out')

  }catch(error){
    next(error);
  }
}

module.exports = {loginMakers, handleValidationErrors, authorization, createMakers, logoutMakers};
