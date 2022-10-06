

import {
  SET_NAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_OCCUPATION_LIST,
  SET_OCCUPATION,
  SET_STATE_LIST,
  SET_STATE,
  SET_ERRORS_NAME,
  SET_ERRORS_EMAIL,
  SET_ERRORS_PASSWORD,
  SET_ERRORS_OCCUPATION,
  SET_ERRORS_STATE
} from './actions'

export const initialState = {
  name: '',
  email: '',
  password: '',
  occupationList: null,
  occupation: 'Select an Occupation...',
  statesList: null,
  state: 'Select a State...',
  nameError: '',
  emailError: '',
  passwordError: '',
  occupationError: '',
  stateError: ''
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_NAME:
      return { ...state, name: payload };
    case SET_EMAIL:
      return { ...state, email: payload };
    case SET_PASSWORD:
      return { ...state, password: payload };
    case SET_OCCUPATION_LIST:
      return { ...state, occupationList: payload };
    case SET_OCCUPATION:
      return { ...state, occupation: payload };
    case SET_STATE_LIST:
      return { ...state, stateList: payload };
    case SET_STATE:
      return { ...state, state: payload }
    case SET_ERRORS_NAME:
      return { ...state, nameError: payload }
    case SET_ERRORS_EMAIL:
      return { ...state, emailError: payload }
    case SET_ERRORS_PASSWORD:
      return { ...state, passwordError: payload }
    case SET_ERRORS_OCCUPATION:
      return { ...state, occupationError: payload }
    case SET_ERRORS_STATE:
      return { ...state, stateError: payload }
    default:
      return state;
  }
}
