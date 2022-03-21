import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {

  const [update, setUpdate] = useState(false);
  const [arrVacations, setArrVacations] = useState([]);


  return (
    <div className="app">
     <Header />
     <Main arrVacations={arrVacations} setArrVacations={setArrVacations} update={update} setUpdate={setUpdate}/>
    </div>
  );
}

export default App;
