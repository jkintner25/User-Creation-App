import {
  Button,
  SuccessBox as MessageBox,
  SuccessMessage as Message
} from '../styled/FormStyles'

import { useNavigate } from "react-router-dom";

const FailComponent = () => {
  const navigate = useNavigate()

  return (
    <MessageBox>
      <Message>Oops!</Message>
      <p>Our server encounterd a problem.</p>
      <Button type='button' onClick={() => navigate('/')}>Try Again</Button>
    </MessageBox>
  )
}

export default FailComponent;
