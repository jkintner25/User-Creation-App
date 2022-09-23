import UserCreationForm from './components/UserCreationForm';
import styled from 'styled-components';
import Wallpaper from './components/Wallpaper';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #300d38;
  color: white;
`

const App = () => (
  <Main>
    <Wallpaper />
    <UserCreationForm />
  </Main>
);

export default App;
