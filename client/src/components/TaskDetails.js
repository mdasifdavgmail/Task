import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from './api'; // Assuming api.js handles the API calls

const TaskDetails = () => {
  const navigate = useNavigate();
  const { taskId } = useParams(); // Get taskId from the URL
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  // Fetch task details on component mount
  useEffect(() => {
    async function fetchTaskDetails() {
      try {
        const response = await api.get(`/tasks/${taskId}`);
        if (response.data.success) {
          setTask(response.data.task);
          setTitle(response.data.task.title);
          setDescription(response.data.task.description);
          setDueDate(response.data.task.dueDate);
          setPriority(response.data.task.priority);
        } else {
          setError('Failed to fetch task details.');
        }
      } catch (err) {
        setError('Error fetching task details.');
      }
    }

    fetchTaskDetails();
  }, [taskId]);

  const handleDeleteTask = async () => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      if (response.data.success) {
        navigate('/tasks'); // Redirect to task list after deletion
      } else {
        setError('Failed to delete task.');
      }
    } catch (err) {
      setError('Error deleting task.');
    }
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/tasks/${taskId}`, { title, description, dueDate, priority });
      if (response.data.success) {
        setIsEditing(false);
        setTask(response.data.task); // Update the task in the state
      } else {
        setError('Failed to update task.');
      }
    } catch (err) {
      setError('Error updating task.');
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>Task Details</h2>
      {error && <div className="alert">{error}</div>}
      
      {/* Display task details or form to edit task */}
      {isEditing ? (
        <form onSubmit={handleUpdateTask}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Update Task</button>
        </form>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <button onClick={handleEditTask}>Edit Task</button>
          <button onClick={handleDeleteTask}>Delete Task</button>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
