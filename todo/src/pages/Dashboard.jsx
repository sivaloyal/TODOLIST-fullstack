import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const addTask = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/tasks/", {
        title,
        description,
        completed: false,
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task.id}/`, {
        ...task,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>TaskFlow</h2>

        <ul>
          <li className="active">Tasks</li>
          <li>Calendar</li>
          <li>Categories</li>
          <li>Settings</li>
        </ul>

        <button onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="content">
        <h1>Hello, Alex! 👋</h1>

        <div className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <button onClick={addTask}>
            Add Task
          </button>
        </div>

        <h2>Active Tasks</h2>

        <div className="task-grid">
          {tasks.map((task) => (
            <div
              className={`task-card ${
                task.completed ? "completed" : ""
              }`}
              key={task.id}
            >
              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <div className="btn-group">
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

                <button
                  className="complete-btn"
                  onClick={() => toggleComplete(task)}
                >
                  {task.completed
                    ? "Completed ✅"
                    : "Complete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;