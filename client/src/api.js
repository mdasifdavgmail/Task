import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (userData) => {
  return await api.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
  return await api.post('/auth/login', credentials);
};

export const createTask = async (taskData, token) => {
  return await api.post('/tasks', taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTasks = async (token) => {
  return await api.get('/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (taskId, taskData, token) => {
  return await api.put(`/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (taskId, token) => {
  return await api.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default api;
