import { createStore } from 'redux';
import Auth from './auth';
import ContactEmailChanged from './defaultEmail';

const initialState = {
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
}


const reducer = (state = initialState, action) => {
    const updatedState = { ...state };

    switch(action.type) {

      case 'LOGIN_INPUT':
        switch(action.ev.target.type) {
          case 'text':
            updatedState.userNameInput=action.ev.target.value;
            return updatedState;

          case 'password':
            updatedState.passwordInput=action.ev.target.value;
            return updatedState;
        default:
          return updatedState;
        }

        case 'ADD_ACCOUNT':
          updatedState.accountConfirm=true;
          console.log(updatedState.accountConfirm);
          return updatedState;

      case 'REDIRECT_LOGIN':
        if (state.userNameInput===state.userName && state.passwordInput===state.password) {
          updatedState.loginRedirecion=true;
          Auth.login();
        } else {
          updatedState.hasFailed=true;
          setTimeout(() => {
            updatedState.loginRedirecion=false;
            updatedState.hasFailed=false;
          }, 50)

        }
        return updatedState;

      case 'SIGNUP_REDIRECT':
        updatedState.signupRedirect=true;
        Auth.login();
        return updatedState;

      case 'LOGOUT':
        updatedState.signupRedirect=false;
        updatedState.accountConfirm=false;
        updatedState.loginRedirecion=false;
        Auth.logout();
        return updatedState;

        case 'TOUCHED':
        if (action.ev.target.action!=="https://formspree.io/alipudina55@gmail.com") {
            action.ev.preventDefault();
            ContactEmailChanged.touched();
            updatedState.isManipulated=true;
          }
          return updatedState;

      default:
        return updatedState;
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





export const store = createStore(reducer);
