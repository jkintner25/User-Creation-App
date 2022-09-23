import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hideIcon from '../images/hide.png';
import viewIcon from '../images/view.png';
import { emailRegex } from '../utils';
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
  setState
} from './store/actions'

function UserCreationForm({ setNameOnSuccess }) {
  const navigate = useNavigate();

  const [formStore, dispatch] = useReducer(reducer, initialState);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false)
  const [passwordIcon, setPasswordIcon] = useState(hideIcon)
  const [passwordFieldType, setPasswordFieldType] = useState('password')

  //reload form component with initial state values
  function resetForm() {
    setSubmitted(false)
    setName(dispatch, '')
    setEmail(dispatch, '')
    setPassword(dispatch, '')
    setOccupation(dispatch, 'Select an Occupation...')
    setState(dispatch, 'Select a State...')
    setErrors({})
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

  function updateName(e) {
    setName(dispatch, e.target.value)
    if (submitted && errors.fullName) setErrors(errors => {
      const newErrors = { ...errors };
      delete newErrors.fullName;
      return newErrors;
    })
  };

  function updateEmail(e) {
    setEmail(dispatch, e.target.value)
    if (errors.email) setErrors(errors => {
      const newErrors = { ...errors };
      delete newErrors.email;
      return newErrors;
    })
  };

  function updatePassword(e) {
    setPassword(dispatch, e.target.value)
    if (errors.password) setErrors(errors => {
      const newErrors = { ...errors };
      delete newErrors.password;
      return newErrors;
    })
  };

  function updateOccupation(e) {
    setOccupation(dispatch, e.target.value)
    if (errors.occupation) setErrors(errors => {
      const newErrors = { ...errors };
      delete newErrors.occupation;
      return newErrors;
    })
  };

  function updateState(e) {
    setState(dispatch, e.target.value)
    if (errors.state) setErrors(errors => {
      const newErrors = { ...errors };
      delete newErrors.state;
      return newErrors;
    })
  };

  function togglePassword() {
    if (passwordIcon === hideIcon) setPasswordIcon(viewIcon) //check up on this
    else setPasswordIcon(hideIcon)

    if (passwordFieldType === 'password') setPasswordFieldType('text')
    else setPasswordFieldType('password')

  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitted(true)

    const validationErrors = {}

    //provide a key for each error so that error can be removed when user updates related slice of state
    if (!formStore.name) validationErrors['fullName'] = 'Please provide your full name.';
    if (!emailRegex.test(formStore.email)) validationErrors['email'] = 'Please provide a valid email.';
    if ((formStore.password.length < 8) || (formStore.password.includes(' '))) validationErrors['password'] = 'Invalid Password.';
    if (formStore.occupation === 'Select an Occupation...') validationErrors['occupation'] = 'Please select an occupation.';
    if (formStore.state === 'Select a State...') validationErrors['state'] = 'Please select a state.';

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
        console.log(response.status)
        navigate("/success")
      }
    } else {
      //set error messages if they exist
      setErrors(validationErrors)
    }
  }

  return (
    <>
      <NewUserForm onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
        <FormSection>
          <LabelDiv>
            <label>Full Name <p>*</p></label>
            {errors.fullName ? <li>{errors.fullName}</li> : null}
          </LabelDiv>
          <input type='text' placeholder='John Doe' value={formStore.name} onChange={updateName} />
        </FormSection>

        <FormSection>
          <LabelDiv>
            <label>Email <p>*</p></label>
            {errors.email ? <li>{errors.email}</li> : null}
          </LabelDiv>
          <input type='text' placeholder='john@email.com' value={formStore.email} onChange={updateEmail} />
        </FormSection>

        <FormSection>
          <LabelDiv>
            <label>Password <p>*</p></label>
            {errors.password ? <li>{errors.password}</li> : <PasswordInstruction>(At Least 8 characters)</PasswordInstruction>}
          </LabelDiv>
          <PasswordInputDiv>
            <input type={passwordFieldType} autoComplete='on' value={formStore.password} onChange={updatePassword} />
            <PasswordImg src={passwordIcon} alt='' onClick={togglePassword} />
          </PasswordInputDiv>
        </FormSection>

        <FormSection>
          <LabelDiv>
            <label>Occupation <p>*</p></label>
            {errors.occupation ? <li>{errors.occupation}</li> : null}
          </LabelDiv>
          <select value={formStore.occupation} onChange={updateOccupation}>
            <option value={'Select an Occupation...'}>Select an Occupation...</option>
            {formStore.occupationList && formStore.occupationList.map((title, i) => {
              return <option key={title} value={title} >{title}</option>
            })}
          </select>
        </FormSection>

        <FormSection>
          <LabelDiv>
            <label>State <p>*</p></label>
            {errors.state ? <li>{errors.state}</li> : null}
          </LabelDiv>
          <select value={formStore.state} onChange={updateState}>
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
