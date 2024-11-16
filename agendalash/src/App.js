import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './view/home';
import Login from './view/login';
import Cadastro from './view/user';



function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/user" element={<Cadastro/>}/>
    </Routes>
   
    </BrowserRouter>
  );
}

export default App;
