
export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_OCCUPATION_LIST = 'SET_OCCUPATION_LIST';
export const SET_OCCUPATION = 'SET_OCCUPATION';
export const SET_STATE_LIST = 'SET_STATE_LIST';
export const SET_STATE = 'SET_STATE';

export const setName = (dispatch, payload) =>
  dispatch({ type: SET_NAME, payload });

export const setEmail = (dispatch, payload) =>
  dispatch({ type: SET_EMAIL, payload });

export const setPassword = (dispatch, payload) =>
  dispatch({ type: SET_PASSWORD, payload });

export const setOccupationList = (dispatch, payload) =>
  dispatch({ type: SET_OCCUPATION_LIST, payload });

export const setOccupation = (dispatch, payload) =>
  dispatch({ type: SET_OCCUPATION, payload });

export const setStateList = (dispatch, payload) =>
  dispatch({ type: SET_STATE_LIST, payload });

export const setState = (dispatch, payload) =>
  dispatch({ type: SET_STATE, payload });
