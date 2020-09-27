import React from 'react';
import './App.css';
import InputForm from './components/inputForm'
import PlayerHandList from './components/playerHandList'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App h-100 d-flex flex-column" >
      <InputForm ></InputForm>
      <PlayerHandList></PlayerHandList>
    </div>
  );
}

export default App;
