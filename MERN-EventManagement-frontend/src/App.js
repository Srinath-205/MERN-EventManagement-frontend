// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/login';
import CreateEvent from './components/Event/CreateEvent';
// import EventList from './components/Event/EventList';

import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './components/HomePage';
import './index.css';
const App = () => {
    return (
        <Router>
            <>
               
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/dashboard" element={<StudentDashboard />}/>
                    <Route path='/admin' element={<AdminDashboard />}/>
                </Routes>
            </>
        </Router>
    );
};

export default App;
