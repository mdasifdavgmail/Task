import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const navigate = useNavigate();

  const handleCreateTask = async () => {
    const token = localStorage.getItem('token');
    try {
      await createTask({ title, description, dueDate, priority }, token);
      alert('Task created successfully!');
      navigate('/task-list');
    } catch (error) {
      alert('Error creating task!');
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="date" onChange={(e) => setDueDate(e.target.value)} />
      <select onChange={(e) => setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskForm;
