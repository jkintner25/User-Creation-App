import {
  Button,
  SuccessBox,
  SuccessMessage
} from '../styled/FormStyles'

import { useNavigate } from "react-router-dom";

const SuccessComponent = ({ nameOnSuccess }) => {
  const navigate = useNavigate()

  return (
    <SuccessBox>
      <SuccessMessage>Success</SuccessMessage>
      <p>Thanks {nameOnSuccess}!</p>
      <Button type='button' onClick={() => navigate('/')}>Back to Form</Button>
    </SuccessBox>
  )
}

export default SuccessComponent;
