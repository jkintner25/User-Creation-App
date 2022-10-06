import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hideIcon from '../images/hide.png';
import viewIcon from '../images/view.png';
import { setErrors, updateField, validateForm } from '../utils';
import data from '../utils/data';

import {
  PasswordImg,
  NewUserForm,
  FormSection,
  LabelDiv,
  PasswordInputDiv,
  PasswordInstruction,
} from '../styled/FormStyles'

import { initialState, reducer } from './store';

import {
  setName,
  setEmail,
  setPassword,
  setOccupationList,
  setOccupation,
  setStateList,
  setState,
  setErrorsName,
  setErrorsEmail,
  setErrorsPassword,
  setErrorsOccupation,
  setErrorsState
} from './store/actions'

function UserCreationForm({ setNameOnSuccess }) {
  const navigate = useNavigate();

  const [formStore, dispatch] = useReducer(reducer, initialState);

  const [passwordIcon, setPasswordIcon] = useState(hideIcon)
  const [passwordFieldType, setPasswordFieldType] = useState('password')

  //reload form component with initial state values
  function resetForm() {
    setName(dispatch, '')
    setEmail(dispatch, '')
    setPassword(dispatch, '')
    setOccupation(dispatch, 'Select an Occupation...')
    setState(dispatch, 'Select a State...')
    // setErrors({})
  }

  useEffect(() => {
    resetForm()
    const handlePromise = async () => {
      const res = await data;
      setOccupationList(dispatch, res.occupations)
      setStateList(dispatch, res.states)
    }
    handlePromise()
  }, [])

  function togglePassword() {
    if (passwordIcon === hideIcon) setPasswordIcon(viewIcon) //check up on this
    else setPasswordIcon(hideIcon)

    if (passwordFieldType === 'password') setPasswordFieldType('text')
    else setPasswordFieldType('password')

  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm(formStore)

    //only submit form if no errors exist
    if (!Object.values(validationErrors).length) {

      setNameOnSuccess(formStore.name)

      const newUser = {
        'name': formStore.name,
        'email': formStore.email,
        'password': formStore.password,
        'occupation': formStore.occupation,
        'state': formStore.state
      }

      const response = await fetch('https://frontend-take-home.fetchrewards.com/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        //replace form with success message
        navigate("/success")
      } else {
        //replace for with server failure message
        navigate("/failure")
      }
    } else {
      //set error messages if they exist
      setErrors(validationErrors,
        setErrorsName,
        setErrorsEmail,
        setErrorsPassword,
        setErrorsOccupation,
        setErrorsState,
        dispatch)
    }
  }

  return (
    <>
      <NewUserForm onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
        <FormSection>
          <LabelDiv>
            <label>Full Name <p>*</p></label>
            {formStore.nameError ? <li>{formStore.nameError}</li> : null}
          </LabelDiv>
          <input type='text' placeholder='John Doe' value={formStore.name} onChange={(e)=>updateField(e.target.value, setName, setErrorsName, dispatch)} />
        </FormSection>

        <FormSection>
          <LabelDiv>
            <label>Email <p>*</p></label>
            {formStore.emailError ? <li>{formStore.emailError}</li> : null}
          </LabelDiv>
          <input type='text' placeholder='john@email.com' value={formStore.email} onChange={(e)=>updateField(e.target.value, setEmail, setErrorsEmail, dispatch)} />
        </FormSection>

        <FormSection>
          <LabelDiv>
            <label>Password <p>*</p></label>
            {formStore.passwordError ? <li>{formStore.passwordError}</li> : <PasswordInstruction>(At Least 8 characters)</PasswordInstruction>}
          </LabelDiv>
          <PasswordInputDiv>
            <input type={passwordFieldType} autoComplete='on' value={formStore.password} onChange={(e)=>updateField(e.target.value, setPassword, setErrorsPassword, dispatch)} />
            <PasswordImg src={passwordIcon} alt='' onClick={togglePassword} />
          </PasswordInputDiv>
        </FormSection>

        <FormSection>
          <LabelDiv>
            <label>Occupation <p>*</p></label>
            {formStore.occupationError ? <li>{formStore.occupationError}</li> : null}
          </LabelDiv>
          <select value={formStore.occupation} onChange={(e)=>updateField(e.target.value, setOccupation, setErrorsOccupation, dispatch)}>
            <option value={'Select an Occupation...'}>Select an Occupation...</option>
            {formStore.occupationList && formStore.occupationList.map((title, i) => {
              return <option key={title} value={title} >{title}</option>
            })}
          </select>
        </FormSection>

        <FormSection>
          <LabelDiv>
            <label>State <p>*</p></label>
            {formStore.stateError ? <li>{formStore.stateError}</li> : null}
          </LabelDiv>
          <select value={formStore.state} onChange={(e)=>updateField(e.target.value, setState, setErrorsState, dispatch)}>
            <option value={'Select a State...'}>Select a State...</option>
            {formStore.stateList && formStore.stateList.map((state) => {
              return <option key={state.abbreviation} value={state.name} >{state.abbreviation} - {state.name}</option>
            })}
          </select>
        </FormSection>

        <FormSection>
          <button type='submit' >Submit</button>
        </FormSection>
      </NewUserForm>
    </>
  );
};

export default UserCreationForm;
