import './App.css';
import Header from './components/Header' ;
import Characters from './components/Characters';
import React, { useState}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [classCard, setClassCard] = useState()

  const handleClick = () => {
    setDarkMode(!darkMode);
    console.log(darkMode)
    const candleButton = document.querySelector(".App");
    if (darkMode === false ) {
      candleButton.classList.add('bg-dark', 'text-light');
      candleButton.classList.remove('bg-ligth', 'text-dark');
      setClassCard('bg-dark', 'text-ligth');
    } else {
      candleButton.classList.remove('bg-dark', 'text-light');
      candleButton.classList.add('bg-ligth', 'text-dark');
      setClassCard('bg-ligth', 'text-dark');
    } 
  };



  return (
    <div className="App">
      <Header onHandleClick={handleClick} darkMode={darkMode} />
      <Characters classCard={classCard} />
    </div>
  );
}

export default App;
