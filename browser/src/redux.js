import {createStore, applyMiddleware} from 'redux';
import thunk  from 'redux-thunk';
import axios from 'axios';
import Auth from './auth';
import ContactEmailChanged from './defaultEmail';

const initialState={
  testName:'',
  questionText:'',
  questionType:'',
  wrongAnswer:'',
  rightAnswer:'',
  allWrongAnswers:[],
  allFullQuestions:[],
  questionnaire:[],
  showTest:false,

  userName: 'ali',
  password: '123',
  loginRedirecion: false,
  hasFailed: false,
  userNameInput: '',
  passwordInput: '',
  addAccount: [],
  accountConfirm: false,
  signupRedirect: false,
  isManipulated: false
};

const reducer =(state=initialState, action)=>{
  const copyOfState={...state};

  switch (action.type) {

    case 'LOGIN_INPUT':
      switch(action.ev.target.type) {
        case 'text':
          copyOfState.userNameInput=action.ev.target.value;
          return copyOfState;

        case 'password':
          copyOfState.passwordInput=action.ev.target.value;
          return copyOfState;
      default:
        return copyOfState;
      }

      case 'ADD_ACCOUNT':
        copyOfState.accountConfirm=true;
        console.log(copyOfState.accountConfirm);
          return copyOfState;

    case 'REDIRECT_LOGIN':
      if (state.userNameInput===state.userName && state.passwordInput===state.password) {
        copyOfState.loginRedirecion=true;
        Auth.login();
      } else {
        copyOfState.hasFailed=true;
        setTimeout(() => {
          copyOfState.loginRedirecion=false;
          copyOfState.hasFailed=false;
        }, 50)

      }
      return copyOfState;

    case 'SIGNUP_REDIRECT':
      copyOfState.signupRedirect=true;
      Auth.login();
      return copyOfState;

    case 'LOGOUT':
      copyOfState.signupRedirect=false;
      copyOfState.accountConfirm=false;
      copyOfState.loginRedirecion=false;
      Auth.logout();
      return copyOfState;

      case 'TOUCHED':
      if (action.ev.target.action!=="https://formspree.io/alipudina55@gmail.com") {
          action.ev.preventDefault();
          ContactEmailChanged.touched();
          copyOfState.isManipulated=true;
        }
        return copyOfState;


    case 'QUESTION_TYPE_CHANGE':
      copyOfState.questionType = action.event.target.value
      return copyOfState;

    case 'TEST_NAME_CHANGE':
      copyOfState.testName = action.event.target.value
      return copyOfState;

    case 'QUESTION_TEXT_CHANGE':
      copyOfState.questionText = action.event.target.value
      return copyOfState;

    case 'ADD_WRONG_ANSWER':
      copyOfState.allWrongAnswers = [...state.allWrongAnswers, copyOfState.wrongAnswer]
      copyOfState.wrongAnswer=''
      return copyOfState;

    case 'WRONG_ANSWER_TEXT_CHANGE':
      copyOfState.wrongAnswer = action.event.target.value
      return copyOfState;

    case 'RIGHT_ANSWER_TEXT_CHANGE':
      copyOfState.rightAnswer = action.event.target.value
      return copyOfState;

    case 'DELETE_WRONG_ANSWER':
      copyOfState.allWrongAnswers=state.allWrongAnswers.filter((each,index)=>parseInt(index)!==parseInt(action.event.target.value))
      return copyOfState;

    case 'ADD_FULL_QUESTION':
       copyOfState.allFullQuestions = [...state.allFullQuestions,
         {questionText:state.questionText,
          questionType:state.questionType,
          rightAnswer:state.rightAnswer,
          allWrongAnswers:[...state.allWrongAnswers]
        }]

       document.querySelector('#questionType').selectedIndex = 0;
       copyOfState.questionText=''
       copyOfState.questionType=''
       copyOfState.rightAnswer=''
       copyOfState.allWrongAnswers=[]
       return copyOfState;

    case 'DELETE_FULL_QUESTION':
      copyOfState.allFullQuestions=state.allFullQuestions.filter((each,index)=>parseInt(index)!==parseInt(action.event.target.value))
      return copyOfState;

    case 'SAVE_FULL_QUESTIONNAIRE':
      copyOfState.questionnaire= [...state.questionnaire, {
        testName:state.testName,
        allFullQuestions:[...state.allFullQuestions]
      }]
      copyOfState.testName=''
      copyOfState.questionText=''
      document.querySelector('#questionType').selectedIndex = 0;
      copyOfState.questionType=''
      copyOfState.rightAnswer=''
      copyOfState.allWrongAnswers=[]
      copyOfState.allFullQuestions=[]
      return copyOfState;

    case 'DELETE_QUESTIONNAIRE':
      copyOfState.testName=''
      copyOfState.questionText=''
      document.querySelector('#questionType').selectedIndex = 0;
      copyOfState.questionType=''
      copyOfState.rightAnswer=''
      copyOfState.allWrongAnswers=[]
      copyOfState.allFullQuestions=[]
      return copyOfState;

    case 'SHOW_TEST':
      copyOfState.questionnaire=action.payload
      return copyOfState;

    default:
      return copyOfState;
 }

}

export const loginInputHandler= ev => {
  return {
    type: 'LOGIN_INPUT',
    ev: ev
  }
}

export const addAccountHandler= ev => {
  return {
    type: 'ADD_ACCOUNT',
    ev: ev
  }
}

export const redirectToLogin= () => {
  return {type: 'REDIRECT_LOGIN'}
}

export const confirmHandler= ev => {
  return {
    type: 'SIGNUP_REDIRECT',
    ev: ev
  }
}

export const logoutChanges= ev => {
  return {
    type: 'LOGOUT',
    ev: ev
  }
}

export const emailHandler= ev => {
  return {
    type: 'TOUCHED',
    ev: ev
  }
}

export const questionTypeChange = ev=>{
  return {type:'QUESTION_TYPE_CHANGE', event:ev}
}
export const testNameChange = ev =>{
  return {type:'TEST_NAME_CHANGE', event:ev}
}
export const questionTextChange = ev =>{
  return {type:'QUESTION_TEXT_CHANGE', event:ev}
}
export const addWrongAnswer = ev =>{
  return {type:'ADD_WRONG_ANSWER', event:ev}
}
export const wrongAnswerTextChange = ev =>{
  return {type:'WRONG_ANSWER_TEXT_CHANGE', event:ev}
}
export const rightAnswerTextChange = ev =>{
  return {type:'RIGHT_ANSWER_TEXT_CHANGE', event:ev}
}
export const deleteWrongAnswer = ev =>{
  return {type:'DELETE_WRONG_ANSWER', event:ev}
}
export const addFullQuestion = ev=>{
  return {type:'ADD_FULL_QUESTION', event:ev}
}
export const deleteFullQuestion = ev=>{
  return {type:'DELETE_FULL_QUESTION', event:ev}
}
export const saveFullQuestionnaire = ev =>{
  return {type:'SAVE_FULL_QUESTIONNAIRE', event:ev}
}
export const deleteQuestionnaire = ev =>{
  return {type:'DELETE_QUESTIONNAIRE', event:ev}
}

export const showTest = ev =>{
  return {type:'SHOW_TEST', event:ev}
}

export const showAllTest = () =>dispatch=>{
  axios
    .get('/eval/tests')
    .then(res =>
      dispatch({
        type:showTest,
        payload:res.data
      })
    )
}


export const store = createStore(reducer, applyMiddleware(thunk));
