import UserCreationForm from './components/UserCreationForm';
import styled from 'styled-components';
import Info from './components/Info';

const Main = styled.div`
display: flex;
flex-direction: row;
/* justify-content: center; */
align-items: center;
width: 100vw;
height: 100vh;
background-color: #300d38;
color: white;
`

function App() {
  return (
    <Main>
      <Info />
      <UserCreationForm />
    </Main>
  );
}

export default App;
