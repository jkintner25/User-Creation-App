import {
  Button,
  SuccessBox,
  SuccessMessage
} from '../styled/FormStyles'

const SuccessComponent = ({ formStore, resetForm }) => (
  <SuccessBox>
    <SuccessMessage>Success</SuccessMessage>
    <p>Thanks {formStore.name}!</p>
    <Button type='button' onClick={resetForm}>Back to Form</Button>
  </SuccessBox>
)

export default SuccessComponent;
