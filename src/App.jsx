import { useState, useEffect } from "react";
import "./index.css";
import profile from "./assets/Images/3.png";

function App() {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Add Task
  const addTask = () => {
    if (input.trim() === "") return;
    setTask([...task, { id: Date.now(), text: input, completed: false, editing: false }]);
    setInput("");
  };

  // Toggle Task Completion
  const toggleComplete = (id) => {
    setTask(task.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  // Enable Editing Mode
  const enableEditing = (id) => {
    setTask(task.map(todo => (todo.id === id ? { ...todo, editing: true } : todo)));
  };

  // Save Edited Task
  const saveEdit = (id, newText) => {
    if (newText.trim() === "") return;
    setTask(task.map(todo => (todo.id === id ? { ...todo, text: newText, editing: false } : todo)));
  };

  // Cancel Edit
  const cancelEdit = (id) => {
    setTask(task.map(todo => (todo.id === id ? { ...todo, editing: false } : todo)));
  };

  // Delete Task
  const deleteTodo = (id) => {
    setTask(task.filter(todo => todo.id !== id));
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Filter Tasks
  const filteredTask = task.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>

      {/* Left Side: Profile Section */}
      <div className="profile-container">
        <img src={profile} alt="Profile" className="profile-img" />
        <h2>Reige J Bongo</h2>
        <p>Admin@domain.com</p>
      </div>

      {/* Right Side: Tasks Section */}
      <div className="tasks-container">
        <div className="header">
          <h1>Tasks</h1>
          <button className="toggle-btn" onClick={toggleDarkMode}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Create Task */}
        <div className="task-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Create a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* Filter Buttons */}
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>

        {/* Task List */}
        <ul className="task-list">
          {filteredTask.map(todo => (
            <li key={todo.id} className={todo.completed ? "completed" : "pending"}>
              
              {/* Left Side */}
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.editing ? (
                  <input
                    type="text"
                    defaultValue={todo.text}
                    onBlur={(e) => saveEdit(todo.id, e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span>{todo.text}</span>
                )}
              </div>

              {/* Right Side */}
              <div className="task-right">
                {todo.editing ? (
                  <>
                    <button onClick={() => saveEdit(todo.id, input)} className="save-btn">✔</button>
                    <button onClick={() => cancelEdit(todo.id)} className="cancel-btn">✖</button>
                  </>
                ) : (
                  <button onClick={() => enableEditing(todo.id)} className="edit-btn">✏️</button>
                )}
                
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">🗑️</button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
