const testsModel = require('../models/testsModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const SECRET= process.env.SECRET;


const createTests = async (req, res, next)=>{
  try{
    const tokenCookie = req.cookies.authToken;
    await jwt.verify(tokenCookie, SECRET);
    req.token = tokenCookie;
    if (req.token){
      const nameTest = await testsModel.findOne({testName: req.body.testName});
      if (nameTest){
        return res.status(404).json({msg:'That name is already taken'});
      }

      await testsModel.create(req.body);

      res.status(200).json({msg:'Test created succesfully'});
    } else{
      return res.status(404).json({msg:'Unauthorized to enter'});
    }


  }catch(error){
    next(error);
  }
}

const evaluateTests = async (req, res, next)=>{
  try{
    const tokenCookie = req.cookies.authToken;
    await jwt.verify(tokenCookie, SECRET);
    req.token = tokenCookie;
    if (req.token){
      const nameTest = await testsModel.findOne({testName: req.body.testName}, {_id:0});
      if (!nameTest){
        return res.status(404).json({msg:'There is no Test with that name'});
      }
      res.status(200).json(nameTest);
    } else{
      return res.status(404).json({msg:'Unauthorized to enter'});
    }

    res.status(200).json(nameTest);

  }catch(error){
    next(error);
  }
}

const emailTransporter = nodemailer.createTransport({
            service:'Hotmail',
            auth:{ user:process.env.EMAIL_USER,
                   pass:process.env.EMAIL_PASS
                 }
            });

const sendTests = async (req, res, next)=>{
  try{
    const tokenCookie = req.cookies.authToken;
    await jwt.verify(tokenCookie, SECRET);
    req.token = tokenCookie;
    if (req.token){
      const fullTest = await testsModel.findOne({testName: req.body.testName});
      if (fullTest){
        const emailOptions ={
                    from:process.env.EMAIL_USER,
                    to:req.body.email,
                    subject:'Invitation to a Test in eVal',
                    html:`<a href="http://localhost:4000/eval/${fullTest.id}/${req.body.email}">Click to go to eVal Test</a>`
                  };
          emailTransporter.sendMail(emailOptions, function(err,info){
            if (err){
              return res.status(404).json('Something went wrong with the email');
            }else{
              return res.status(200).json('Email(s) sent succesfully');
            }
          })
        }else{
          return res.status(404).json({msg:'That test name does not exist'})
        }} else{
      return res.status(404).json({msg:'Unauthorized to enter'});
    }

  }catch(error){
    next(error);
  }
}
module.exports = {createTests, evaluateTests, sendTests};
