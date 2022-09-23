import { useEffect, useState } from 'react';
import styled from 'styled-components';
import hide from '../images/hide.png';
import view from '../images/view.png';

const PasswordImg = styled.img`
margin: 0 0 0 4px;
padding: 0;
width: 22px;
color: white;
cursor: pointer;
`

const NewUserForm = styled.form`
display: flex;
flex-direction: column;
background-color: #300d38;
color: white;
justify-content: center;
align-items: center;
margin: 0;
width: 100%;
height: 100%;

& h1 {
    margin: 0 0 50px -6%;
}

& label {
    display: flex;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    & p {
        margin: 0 0 0 3px;
        padding: 0;
        color: #dc3545;
    }
}

& select {
    margin: 0;
    padding: 0;
    width: 395px;
    font-size: 20px;
    border-radius: 10px;
    padding-left: 10px;
}
`

const FormSection = styled.div`
position: relative;
height: 68px;
width: 425px;
margin: 4px 0;

& input {
    margin: 0;
    padding: 0;
    width: 380px;
    font-size: 22px;
    border-radius: 10px;
    padding-left: 10px;
}

& button {
    width: 120px;
    height: 40px;
    font-size: larger;
    background-color: #ed6a7c;
    border: 1px solid #ed6a7c;
    border-radius: 4px;
    justify-content: space-between;
    transition: background-color 0.4s ease-out, border 0.4s ease-out;

    &:hover {
        background-color: #ffa900;
        border: 1px solid #ffa900;
        cursor: pointer;
    }
}
`

const LabelDiv = styled.div`
display: flex;
flex-direction: row;
height: 50%;
align-items: center;
justify-content: space-between;
margin: 0 0 -6px 0;

& li {
    margin-right: 30px;
    list-style: none;
    color: #dc3545;
}
`

const PasswordInputDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`
const PasswordInstruction = styled.p`
font-size: 16px;
margin: 0 30px 0 0;
`

function UserCreationForm() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [occupations, setOccupations] = useState([]);
    const [occupation, setOccupation] = useState('Select an Occupation...');
    const [states, setStates] = useState([]);
    const [state, setState] = useState('Select a State...');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const [viewPasswordIcon, setViewPasswordIcon] = useState(hide)
    const [passwordFieldType, setPasswordFieldType] = useState('password')

    const emailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

    // fetch occupations and states data from provided api route
    // set local state equal to response if promise is fulfilled
    const getData = async () => {
        const response = await fetch('https://frontend-take-home.fetchrewards.com/form')
        if (response.ok) {
            const data = await response.json();
            setOccupations(data.occupations);
            setStates(data.states);
        } else {
            const data = await response.json();
            setErrors(data);
        }
    };

    useEffect(() => {

        getData()

    }, []);

    function updateName(e) {
        setFullName(e.target.value)
        if (submitted && errors.fullName) setErrors(errors => {
            const newErrors = errors;
            delete newErrors.fullName;
            return newErrors;
        })
    };

    useEffect(() => {
        if (!submitted) return;
        if (!fullName) setErrors(errors => {
            const newErrors = errors;
            newErrors['fullName'] = 'Please provide your full name.';
            return newErrors;
        })
    }, [fullName])



    function updateEmail(e) {
        if (errors.email) setErrors(errors => {
            const newErrors = errors;
            delete newErrors.email;
            return newErrors;
        })
        setEmail(e.target.value)
    };

    function updatePassword(e) {
        if (errors.password) setErrors(errors => {
            const newErrors = errors;
            delete newErrors.password;
            return newErrors;
        })
        setPassword(e.target.value)
    };

    function updateOccupation(e) {
        if (errors.occupation) setErrors(errors => {
            const newErrors = errors;
            delete newErrors.occupation;
            return newErrors;
        })
        setOccupation(e.target.value)
    };

    function updateState(e) {
        if (errors.state) setErrors(errors => {
            const newErrors = errors;
            delete newErrors.state;
            return newErrors;
        })
        setState(e.target.value)
    };

    function toggleViewPassword() {
        if (viewPasswordIcon === hide) setViewPasswordIcon(view)
        else setViewPasswordIcon(hide)

        if (passwordFieldType === 'password') setPasswordFieldType('text')
        else setPasswordFieldType('password')

    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        let validationErrors = {}

        if (!fullName) validationErrors['fullName'] = 'Please provide your full name.';
        if (!emailRegex.test(email)) validationErrors['email'] = 'Please provide a valid email.';
        if (password.length < 8) validationErrors['password'] = 'Password requires 8 characters or more.';
        if (occupation === 'Select an Occupation...') validationErrors['occupation'] = 'Please select an occupation.';
        if (state === 'Select a State...') validationErrors['state'] = 'Please select a state.';

        if (!Object.values(validationErrors).length) {

            const newUser = {
                'name': fullName,
                'email': email,
                'password': password,
                'occupation': occupation,
                'state': state
            }

            const response = await fetch('https://frontend-take-home.fetchrewards.com/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                console.log(response.status)
            }
        } else {
            setErrors(validationErrors)
        }
    }

    return (
        <>
            <NewUserForm onSubmit={handleSubmit}>
                <h1>Create Your Account</h1>
                <FormSection>
                    <LabelDiv>
                        <label>Full Name <p className='asterisk'>*</p></label>
                        {errors.fullName ? <li>{errors.fullName}</li> : null}
                    </LabelDiv>
                    <input type='text' placeholder='John Doe' value={fullName} onChange={updateName} />
                </FormSection>

                <FormSection>
                    <LabelDiv>
                        <label>Email <p className='asterisk'>*</p></label>
                        {errors.email ? <li>{errors.email}</li> : null}
                    </LabelDiv>
                    <input type='text' placeholder='john@email.com' value={email} onChange={updateEmail} />
                </FormSection>

                <FormSection>
                    <LabelDiv>
                        <label>Password <p className='asterisk'>*</p></label>
                        {errors.password ? <li>{errors.password}</li> : <PasswordInstruction>(At Least 8 characters)</PasswordInstruction>}
                    </LabelDiv>
                    <PasswordInputDiv>
                        <input type={passwordFieldType} value={password} onChange={updatePassword} />
                        <PasswordImg className='' src={viewPasswordIcon} alt='' onClick={toggleViewPassword} />
                    </PasswordInputDiv>
                </FormSection>

                <FormSection>
                    <LabelDiv>
                        <label>Occupation <p className='asterisk'>*</p></label>
                        {errors.occupation ? <li>{errors.occupation}</li> : null}
                    </LabelDiv>
                    <select value={occupation} onChange={updateOccupation}>
                        <option value={'Select an Occupation...'}>Select an Occupation...</option>
                        {occupations && occupations.map((title, i) => {
                            return <option key={i} value={title} >{title}</option>
                        })}
                    </select>
                </FormSection>

                <FormSection>
                    <LabelDiv>
                        <label>State <p className='asterisk'>*</p></label>
                        {errors.state ? <li>{errors.state}</li> : null}
                    </LabelDiv>
                    <select value={state} onChange={updateState}>
                        <option value={'Select a State...'}>Select a State...</option>
                        {states && states.map((state, i) => {
                            return <option key={i} value={state.name} >{state.abbreviation} - {state.name}</option>
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
