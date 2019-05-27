const testsModel = require('../models/testsModel');

const createTests = async (req, res, next)=>{
  try{
    const nameTest = await testsModel.findOne({testName: req.body.testName});
    if (nameTest){
      return res.status(404).json({msg:'That name is already taken'});
    }

    await testsModel.create(req.body);

    res.status(200).json({msg:req.body.questionnaire});

  }catch(error){
    next(error);
  }
}

const evaluateTests = async (req, res, next)=>{
  try{
    const nameTest = await testsModel.findOne({testName: req.body.testName}, {_id:0});
    if (!nameTest){
      return res.status(404).json({msg:'There is no Test with that name'});
    }

    res.status(200).json(nameTest);

  }catch(error){
    next(error);
  }
}

module.exports = {createTests, evaluateTests};
