import UserCreationForm from './components/UserCreationForm';
import styled from 'styled-components';
import Wallpaper from './components/Wallpaper';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuccessComponent from './components/SuccessComponent';
import { useState } from 'react';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #300d38;
  color: white;
`

const App = () => {
  const [nameOnSuccess, setNameOnSuccess] = useState('')

  return (
    <BrowserRouter>
      <Main>
        <Wallpaper />
        <Routes>
          <Route exact path='/' element={<UserCreationForm setNameOnSuccess={setNameOnSuccess} />} />
          <Route exact path='/success' element={<SuccessComponent nameOnSuccess={nameOnSuccess} />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
