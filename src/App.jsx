import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './pages/Mainpage';
import FinalPage from './pages/FinalPage';
import Diagnosis from './pages/Diagnosis';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/inputpage" element={<FinalPage />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
