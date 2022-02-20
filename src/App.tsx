import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Splash } from './components/Splash';

function App() {
  
  console.log('React App starting ...')
  return (
    <div className="App">
      <Splash />
    </div>
  );
}

export default App;
