const makersModel = require('../models/makersModel');
const {validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({errors: validationErrors.array()});
  }
  next();
}

const createMakers = async (req, res, next)=>{
  try{
    const createMaker = await makersModel.findOne({userName: req.body.userName});
    if (createMaker){
      return res.status(404).json({msg:'That name is already taken'});
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

    const checkPasswordsMatch = await bcrypt.compare(req.body.password, findMaker.password);

    if (!checkPasswordsMatch) {
      return res.status(400).json({msg: 'Password is incorrect'});
    }

    res.status(200).json({userName: findMaker.userName});

  }catch (error) {
    next(error);
  }
}


module.exports = {loginMakers, handleValidationErrors, createMakers};
