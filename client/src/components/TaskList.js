import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await getTasks(token);
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await deleteTask(taskId, token);
      alert('Task deleted successfully!');
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      alert('Error deleting task!');
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/create-task`, { state: { taskId } });
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>Due: {task.dueDate}</p>
          <button onClick={() => handleEdit(task._id)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
