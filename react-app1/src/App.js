import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Images from './components/images';
import {Newprofile} from './components/newprofile';
import Pdf from './components/pdf';

function App() {
  return (
   
    <BrowserRouter>
       <Routes>
       <Route exact path="/" element={<Login/>} />
        <Route path="/images" element={<Images/>} />
        <Route path='/pdfs' element={<Pdf/>} />
    </Routes>
    </BrowserRouter>
  
 
  );
}

export default App;
