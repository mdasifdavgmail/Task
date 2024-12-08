import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from './TaskCard'; // Component for displaying individual task

function TaskPage({ token }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, [token]);

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found. Create your first task!</p>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
      
      {/* Button to create a new task */}
      <button onClick={() => navigate('/task/create')}>Create New Task</button>
    </div>
  );
}

export default TaskPage;
