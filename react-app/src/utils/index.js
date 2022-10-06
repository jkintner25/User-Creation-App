
export const emailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

export const setErrors = (
  errors,
  setErrorsName,
  setErrorsEmail,
  setErrorsPassword,
  setErrorsOccupation,
  setErrorsState,
  dispatch) => {

  setErrorsName(dispatch, errors.name)
  setErrorsEmail(dispatch, errors.email)
  setErrorsPassword(dispatch, errors.password)
  setErrorsOccupation(dispatch, errors.occupation)
  setErrorsState(dispatch, errors.state)
};

export const updateField = (value, setField, setError, dispatch) => {
  setField(dispatch, value)
  setError(dispatch, '')
};

export const validateForm = (formStore) => {
  const errors = {}

  if (!formStore.name) errors['name'] = 'Please provide your full name.';
  if (!emailRegex.test(formStore.email)) errors['email'] = 'Please provide a valid email.';
  if ((formStore.password.length < 8) || (formStore.password.includes(' '))) errors['password'] = 'Invalid Password.';
  if (formStore.occupation === 'Select an Occupation...') errors['occupation'] = 'Please select an occupation.';
  if (formStore.state === 'Select a State...') errors['state'] = 'Please select a state.';

  return errors;
}
