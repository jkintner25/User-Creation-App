import styled from "styled-components";

export const PasswordImg = styled.img`
  margin: 0 0 0 4px;
  padding: 0;
  width: 22px;
  color: white;
  cursor: pointer;
`

export const NewUserForm = styled.form`
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

export const FormSection = styled.div`
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
export const Button = styled.button`
  width: 160px;
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
`

export const LabelDiv = styled.div`
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

export const PasswordInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const PasswordInstruction = styled.p`
  font-size: 16px;
  margin: 0 30px 0 0;
`

export const SuccessBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #300d38;
  color: white;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100%;
  height: 100%;

  & p {
    font-size: 20px;
    margin: 0 0 50px 0;
  }
`

export const SuccessMessage = styled.h1`
  font-size: 80px;
  color: white;
  margin: 0 0 26px 0;
`
