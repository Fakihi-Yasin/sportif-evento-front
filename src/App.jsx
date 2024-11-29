import { useState } from 'react'
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './Dashboard/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration-form" element={<Register/>} />
        <Route path="/login-form" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} /> {/* Nouvelle route pour le tableau de bord */}
      </Routes>
    </Router>
  )
}

export default App