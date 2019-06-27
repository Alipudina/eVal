const testsModel = require('../models/testsModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const path = require ('path');

const emailtransporter = nodemailer.createTransport({
  service:"Hotmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS}
  })


const createTests = async (req, res, next)=>{
  try{
    const tokenCookie = req.cookies.authToken;
    await jwt.verify(tokenCookie, process.env.SECRET);
    req.token = tokenCookie;
    const decodedUser= await jwt.decode(req.token, process.env.SECRET)
    if (req.token){
      const nameTest = await testsModel.findOne({testName: req.body.testName});
      if (nameTest){
        return res.status(404).json({msg:'That name is already taken'});
      }
      req.body.authName=decodedUser.userName;
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
    await jwt.verify(tokenCookie, process.env.SECRET);
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

  }catch(error){
    next(error);
  }
}
const getTestNames = async (req, res, next)=>{
  try{
    const tokenCookie = req.cookies.authToken;
    await jwt.verify(tokenCookie, process.env.SECRET);
    const decodedUser= await jwt.decode(tokenCookie, process.env.SECRET)
    req.token = tokenCookie;
    if (req.token){
      const allTestNames = await testsModel.find({authName:decodedUser.userName}, {_id:0, testName:1});
      res.status(200).json(allTestNames);
    } else{
      return res.status(404).json({msg:'Unauthorized to enter'});
    }
    next();

  }catch(error){
    next(error);
  }
}

const showTest = async (req, res, next)=>{
  try{
    const tokenCookie = req.cookies.authToken;
    await jwt.verify(tokenCookie, process.env.SECRET);
    req.token = tokenCookie;
    if (req.token){
      const allTestNames = await testsModel.find({}, {_id:0});
      res.status(200).json(allTestNames);
    } else{
      return res.status(404).json({msg:'Unauthorized to enter'});
    }

  }catch(error){
    next(error);
  }
}


const sendTests = async (req, res, next)=>{
  try{
    console.log(req.body);
    const tokenCookie = req.cookies.authToken;

    await jwt.verify(tokenCookie, process.env.SECRET);
    const decodedUser= await jwt.decode(tokenCookie, process.env.SECRET)
    const fullTest = await testsModel.findOne({testName: req.body.testName});
      if (fullTest){
        const emailOptions ={
                    from:process.env.EMAIL_USER,
                    to:req.body.email,
                    subject:'Invitation to a Test in eVal',
                    html:`<a href="http://localhost:4000/eval/protected/testThroughEmail/${fullTest._id}">Click to go to eVal Test with Id ${fullTest._id}</a>`
                  };
        const info=  await emailtransporter.sendMail(emailOptions);
           return info?res.status(200).json({msg:"email sent succesfully"}):res.status(400).json({msg:"Error occured"})
        }else{
          return res.status(404).json({msg:'That test name does not exist'})
        }

  }catch(error){
    next(error);
  }
}
const leadToLandingPage = async (req, res, next)=>{
  try{
    res.cookie("testId", req.params.testName)
    return  res.sendFile(path.join(__dirname,'..', 'browser','build', 'index.html'))


  }catch(error){
    next(error);
  }
}
module.exports = {createTests, evaluateTests, sendTests, getTestNames, showTest, leadToLandingPage};
