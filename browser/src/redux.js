import {createStore} from 'redux';

const initialState={
  testName:'',
  questionText:'',
  questionType:'',
  wrongAnswer:'',
  rightAnswer:'',
  allWrongAnswers:[],
  allFullQuestions:[],
  questionnaire:[]
};

const reducer =(state=initialState, action)=>{
  const copyOfState={...state};

  switch (action.type) {

    case 'questionTypeChange':
      copyOfState.questionType = action.event.target.value
      return copyOfState;

    case 'testNameChange':
      copyOfState.testName = action.event.target.value
      return copyOfState;

    case 'questionTextChange':
      copyOfState.questionText = action.event.target.value
      return copyOfState;

    case 'addWrongAnswer':
      copyOfState.allWrongAnswers = [...state.allWrongAnswers, copyOfState.wrongAnswer]
      copyOfState.wrongAnswer=''
      return copyOfState;

    case 'wrongQuestionTextChange':
      copyOfState.wrongAnswer = action.event.target.value
      return copyOfState;

    case 'rightQuestionTextChange':
      copyOfState.rightAnswer = action.event.target.value
      return copyOfState;

    case 'deleteWrongAnswer':
      copyOfState.allWrongAnswers=copyOfState.allWrongAnswers.filter((each,index)=>index!=action.event.target.value)
      return copyOfState;

    case 'addFullQuestion':
      copyOfState.allFullQuestions = [...state.allFullQuestions, {questionText:state.questionText, questionType:state.questionType, rightAnswer:state.rightAnswer, allWrongAnswers:[...state.allWrongAnswers]}]
       copyOfState.questionText=''
       copyOfState.questionType=''
       copyOfState.rightAnswer=''
       copyOfState.allWrongAnswers=[]
       console.log(copyOfState.allFullQuestions)
       return copyOfState;

    case 'deleteFullQuestion':
      copyOfState.allFullQuestions=copyOfState.allFullQuestions.filter((each,index)=>index!=action.event.target.value)
      console.log(copyOfState.allFullQuestions)
      return copyOfState;

    default:
      return copyOfState;
}

}


export const questionTypeChange = ev=>{
  return {type:'questionTypeChange', event:ev}
}
export const testNameChange = ev =>{
  return {type:'testNameChange', event:ev}
}
export const questionTextChange = ev =>{
  return {type:'questionTextChange', event:ev}
}
export const questionAddAnswer = ev =>{
  return {type:'questionAddAnswer', event:ev}
}
export const addWrongAnswer = ev =>{
  return {type:'addWrongAnswer', event:ev}
}
export const wrongQuestionTextChange = ev =>{
  return {type:'wrongQuestionTextChange', event:ev}
}
export const rightQuestionTextChange = ev =>{
  return {type:'rightQuestionTextChange', event:ev}
}
export const deleteWrongAnswer = ev =>{
  return {type:'deleteWrongAnswer', event:ev}
}
export const addFullQuestion = ev=>{
  return {type:'addFullQuestion', event:ev}
}
export const deleteFullQuestion = ev=>{
  return {type:'deleteFullQuestion', event:ev}
}
export const store = createStore(reducer);
