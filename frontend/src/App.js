import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserRegistration from './components/UserRegistration';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login/>} /> 
          <Route path="/register" element={<UserRegistration/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;