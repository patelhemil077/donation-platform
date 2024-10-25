// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Donate from './components/Donate';
import Success from './components/Success';
import Cancel from './components/Cancel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Donate />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;
