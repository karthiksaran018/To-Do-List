import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css'; // Make sure your CSS file is properly imported

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [deadline, setDeadline] = useState(new Date());

  // Function to handle input change
  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([
        ...tasks,
        {
          text: task,
          deadline: deadline.toLocaleString(),
          completed: false,
        },
      ]);
      setTask('');
      setDeadline(new Date()); // Reset the date picker
    }
  };

  // Function to toggle the completion status of a task
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <video autoPlay loop muted playsInline className="video-bg">
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="app-container">
        <h1>My To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="What's your next task?"
          />
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            showTimeSelect
            dateFormat="Pp"
            className="date-picker"
          />
          <button onClick={addTask} className="add-task-btn">
            Add Task
          </button>
        </div>

        {/* Task Categories */}
        <div className="task-section">
          {/* Pending Tasks Section */}
          <div className="task-category">
            <h2>Pending Tasks</h2>
            <ul className="task-list pending">
              {tasks
                .filter((task) => !task.completed)
                .map((task, index) => (
                  <li key={index} className="task-item">
                    <div className="task-info">
                      <span className="task-text">{task.text}</span>
                      <span className="task-deadline">{task.deadline}</span>
                    </div>
                    <div className="task-actions">
                      <button
                        onClick={() => toggleTask(index)}
                        className="complete-btn"
                      >
                        ✔
                      </button>
                      <button
                        onClick={() => deleteTask(index)}
                        className="delete-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Completed Tasks Section */}
          <div className="task-category">
            <h2>Completed Tasks</h2>
            <ul className="task-list completed">
              {tasks
                .filter((task) => task.completed)
                .map((task, index) => (
                  <li key={index} className="task-item">
                    <div className="task-info">
                      <span className="task-text">{task.text}</span>
                      <span className="task-deadline">{task.deadline}</span>
                    </div>
                    <div className="task-actions">
                      <button
                        onClick={() => deleteTask(index)}
                        className="delete-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
