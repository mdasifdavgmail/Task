// App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';  // Import Navigate for redirection
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to /login by default */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create-task" element={<TaskForm />} />
      <Route path="/task-list" element={<TaskList />} />
    </Routes>
  );
}

export default App;
