import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Auth from './auth';
import ContactEmailChanged from './defaultEmail';

const initialState = {
  testName: '',
  allTestNames:[],
  questionText: '',
  questionType: '',
  wrongAnswer: '',
  rightAnswer: '',
  allWrongAnswers: [],
  allFullQuestions: [],
  questionnaire: [],
  showTest: false,

  userName: '',
  password: '',
  loginRedirecion: false,
  hasFailed: false,
  userNameInput: '',
  passwordInput: '',
  accountConfirm: false,
  signupRedirect: false,
  isManipulated: false,

  testArray: ['Math', 'Physics', 'Chemistry', 'Biology'],
  addEmailArray: [],
  testLink: 'http://test-link',

  userInfo:null,
  signinName: '',
  signinEmail: 'alijkkdkjd',
  signinUserName: '',
  signinPassword: '',
  signinMsg: '',
  signinSuccess: false,
  signinFaild: false
};

const reducer = (state = initialState, action) => {
  const copyOfState = { ...state };

  switch (action.type) {

    case 'SIGNIN_INPUT':
      switch(action.ev.target.getAttribute('ident')) {
        case 'email':
          copyOfState.signinEmail= action.ev.target.value;
          return copyOfState;

        case 'username':
          copyOfState.signinUserName= action.ev.target.value;
          return copyOfState;

        case 'password':
          copyOfState.signinPassword=action.ev.target.value;
          return copyOfState;
        default:
        return copyOfState;
      }

    case 'LOGIN_INPUT':
      switch (action.ev.target.type) {
        case 'text':
          copyOfState.userNameInput = action.ev.target.value;
          return copyOfState;

        case 'password':
          copyOfState.passwordInput = action.ev.target.value;
          return copyOfState;
        default:
          return copyOfState;
      }

    case 'ADD_ACCOUNT':
      copyOfState.accountConfirm = true;
      console.log(copyOfState.accountConfirm);
      return copyOfState;


    case 'REDIRECT_LOGIN':
      return { ...copyOfState, loginRedirecion: true };


    case 'REDIRECT_LOGINs':
      if (state.userNameInput === state.userName && state.passwordInput === state.password) {
        copyOfState.loginRedirecion = true;
        Auth.login();
      } else {
        copyOfState.hasFailed = true;
        setTimeout(() => {
          copyOfState.loginRedirecion = false;
          copyOfState.hasFailed = false;
        }, 50)

      }
      return copyOfState;

    case 'SIGNUP_REDIRECT':
      copyOfState.signinMsg=action.payload.msg;
      copyOfState.signinSuccess=true;

      setTimeout(() => {
        copyOfState.signupRedirect=false;
        copyOfState.signinSuccess=false;
        Auth.login();
        return copyOfState;
      }, 3000)
      return copyOfState;

    case 'SIGNIN_TRUE':
      copyOfState.signupRedirect=true;
      Auth.login();
      return copyOfState;

      case 'SIGNIN_ERROR':
        copyOfState.signinFaild=true;
        return copyOfState;

    case 'LOGOUT':
      copyOfState.signupRedirect = false;
      copyOfState.accountConfirm = false;
      copyOfState.loginRedirecion = false;
      Auth.logout();
      return copyOfState;

    case 'TOUCHED':
      if (action.ev.target.action !== "https://formspree.io/alipudina55@gmail.com") {
        action.ev.preventDefault();
        ContactEmailChanged.touched();
        copyOfState.isManipulated = true;
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
      copyOfState.wrongAnswer = ''
      return copyOfState;

    case 'WRONG_ANSWER_TEXT_CHANGE':
      copyOfState.wrongAnswer = action.event.target.value
      return copyOfState;

    case 'RIGHT_ANSWER_TEXT_CHANGE':
      copyOfState.rightAnswer = action.event.target.value
      return copyOfState;

    case 'DELETE_WRONG_ANSWER':
      copyOfState.allWrongAnswers = state.allWrongAnswers.filter((each, index) => parseInt(index) !== parseInt(action.event.target.value))
      return copyOfState;

    case 'ADD_FULL_QUESTION':
      copyOfState.allFullQuestions = [...state.allFullQuestions,
      {
        questionText: state.questionText,
        questionType: state.questionType,
        rightAnswer: state.rightAnswer,
        allWrongAnswers: [...state.allWrongAnswers]
      }]

      document.querySelector('#questionType').selectedIndex = 0;
      copyOfState.questionText = ''
      copyOfState.questionType = ''
      copyOfState.rightAnswer = ''
      copyOfState.allWrongAnswers = []
      return copyOfState;

    case 'DELETE_FULL_QUESTION':
      copyOfState.allFullQuestions = state.allFullQuestions.filter((each, index) => parseInt(index) !== parseInt(action.event.target.value))
      return copyOfState;

    case 'SAVE_FULL_TEST':
      copyOfState.questionnaire = [...state.questionnaire, {
        testName: state.testName,
        allFullQuestions: [...state.allFullQuestions]
      }]
      copyOfState.testName = ''
      copyOfState.questionText = ''
      document.querySelector('#questionType').selectedIndex = 0;
      copyOfState.questionType = ''
      copyOfState.rightAnswer = ''
      copyOfState.allWrongAnswers = []
      copyOfState.allFullQuestions = []
      return copyOfState;

    case 'DELETE_QUESTIONNAIRE':
      copyOfState.testName = ''
      copyOfState.questionText = ''
      document.querySelector('#questionType').selectedIndex = 0;
      copyOfState.questionType = ''
      copyOfState.rightAnswer = ''
      copyOfState.allWrongAnswers = []
      copyOfState.allFullQuestions = []
      return copyOfState;

    case 'SHOW_TEST':
      copyOfState.questionnaire = [...state.questionnaire, action.testName]
      return copyOfState;

    case 'FETCH_DATA':
      return { ...copyOfState, userInfo: action.userData };

    case 'SHOW_TEST_NAMES':
      copyOfState.allTestNames = action.payload
      console.log(copyOfState.allTestNames[1].testName)
      return copyOfState;


    default:
      return copyOfState;
  }

}

export const loginInputHandler = ev => {
  return {
    type: 'LOGIN_INPUT',
    ev: ev
  }
}

export const signinInputHandler= ev => {
  return {
    type: 'SIGNIN_INPUT',
    ev: ev
  }
}

export const redirectToLogin= () => {
  return {type: 'REDIRECT_LOGIN'}
}

export const logoutChanges = ev => {
  return {
    type: 'LOGOUT',
    ev: ev
  }
}

export const emailHandler = ev => {
  return {
    type: 'TOUCHED',
    ev: ev
  }
}

export const questionTypeChange = ev => {
  return { type: 'QUESTION_TYPE_CHANGE', event: ev }
}
export const testNameChange = ev => {
  return { type: 'TEST_NAME_CHANGE', event: ev }
}
export const questionTextChange = ev => {
  return { type: 'QUESTION_TEXT_CHANGE', event: ev }
}
export const addWrongAnswer = ev => {
  return { type: 'ADD_WRONG_ANSWER', event: ev }
}
export const wrongAnswerTextChange = ev => {
  return { type: 'WRONG_ANSWER_TEXT_CHANGE', event: ev }
}
export const rightAnswerTextChange = ev => {
  return { type: 'RIGHT_ANSWER_TEXT_CHANGE', event: ev }
}
export const deleteWrongAnswer = ev => {
  return { type: 'DELETE_WRONG_ANSWER', event: ev }
}
export const addFullQuestion = ev => {
  return { type: 'ADD_FULL_QUESTION', event: ev }
}
export const deleteFullQuestion = ev => {
  return { type: 'DELETE_FULL_QUESTION', event: ev }
}
export const saveFullTest = ev => {
  return { type: 'SAVE_FULL_TEST', event: ev }
}
export const deleteQuestionnaire = ev => {
  return { type: 'DELETE_QUESTIONNAIRE', event: ev }
}
export const showTest = testName => {
  return { type: 'SHOW_TEST', testName: testName }
}
export const requestAction = userData => {
  return { type: 'FETCH_DATA', userData: userData }
}
export const showTestNames = payload=>{
  return {type:'SHOW_TEST_NAMES', payload:payload}
}
const signinDispatch= data => {
  return {
    type: 'SIGNUP_REDIRECT',
    payload: data
  }
}

const makeSigninTrue= () => {
  return {
    type: 'SIGNIN_TRUE'
  }
}

const signinError= () => {
  return {
    type: 'SIGNIN_ERROR'
  }
}





// export const makeFetch = () => {
//   return function (dispatch) {
//     fetch('/eval/protected/test')
//       .then(res => res.json())
//       .then(tests => console.log(tests))
//       .catch(error => console.log(error))
//   }
// }

export const loginFetch = credentials => {
  return function (dispatch) {
    fetch('/eval/login', {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(res => {
        if (res.status === 400 || res.status === 404) {
          throw new Error('Authentication failed');
        }

        return res.json();
      })
      .then(userData => {
        Auth.login();
        dispatch(requestAction(userData));
        dispatch(redirectToLogin());
      })
      .catch(err => {
        console.warn(err);
        // dispatch(hasFailedAction());
      })
  }
}
export const saveFullQuestionnaire = fullTest => {
  return function(dispatch) {
    fetch('/eval/protected/create', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(fullTest)
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data);
      dispatch(saveFullTest(data.fullTest));
    })
    .catch(err => console.warn(err))
  }
}



export const signinFetch = credentials => {
  return function(dispatch) {
    fetch('/eval/signin', {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    .then(res => {
      if (res.status === 400 || res.status === 404) {
        dispatch(signinError());
        throw new Error('signin failed');

      }

      return res.json();
    })
    .then(data => {
      console.log(data);
      dispatch(signinDispatch(data));
      setTimeout(() => {
        dispatch(makeSigninTrue());
      }, 2000)
    })
    .catch(err => {
      console.warn(err);
    })
  }
}

export const getTestNames = () => {
  return function(dispatch) {
    fetch('/eval/protected/testpage', {
      method: 'get',
      headers: { 'Content-Type': 'application/json'},
    })
    .then(res => {
      return res.json()
    })
    .then(testData => {
      console.log(testData);
      var stringData=testData;
      // SON.stringify(testData);
      console.log(stringData);
      dispatch(showTestNames(stringData));
    })
    .catch(err => console.warn(err))
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));
