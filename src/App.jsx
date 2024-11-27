import { useState } from 'react'
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
      <Router>
      <Routes>
      <Route path="/registration-form" element={<Register />} />
      </Routes>
      </Router>
  )
}

export default App
