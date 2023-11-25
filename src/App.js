import React from 'react';
import './App.css';
import Header from './components/header'
import Home from './components/home';
function App() {
  return (
    <div style={{background:'#171717', height:'100vh'}}>
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
