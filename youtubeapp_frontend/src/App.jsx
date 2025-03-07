import { useState } from 'react'
import './App.css' ;

import Navbar from './components/Navbar.jsx';
import Register from './components/Register.jsx';
import { Route, Router, Routes } from 'react-router-dom';

function App() {
    return(
    <>
    <Navbar/>
    <Router>
        <Routes>
        <Route path='/' element={<Register />} />
        <Route path="/editAvatar" element={<editAvatar />} />

        </Routes>
    </Router>
    
    </>
  )
}

export default App
