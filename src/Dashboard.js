import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]); /*([])initializes state with an empty array*/
  const navigate = useNavigate(); /*it returns a function stored in*/ 

  useEffect(() => { /*used for fetching data,Checking login,Calling APIs*/
    const isAuth = 
      localStorage.getItem("isAuthenticated") === "true"; /*if user is not logged in, don't allow access to this page , send them back to login*/

    if (!isAuth) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
   const savedTasks =
JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const habitRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="dashboard">
      <div className="fruit-bg">
        <span className="fruit">🍉</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🍋</span>
        <span className="fruit">🍉</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🍋</span>
        <span className="fruit">🍉</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🍋</span>
        <span className="fruit">🍉</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🍉</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🍋</span>
        <span className="fruit">🍉</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🍋</span>
        <span className="fruit">🍉</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🍋</span>
        <span className="fruit">🎀</span>
        <span className="fruit">🎀</span>
        
       
      </div>

      <h1>Dashboard</h1>
      <p>Welcome back! Here's your productivity overview</p>

      <div className="nav-buttons">
        <button onClick={() => navigate("/tasks")}>Tasks</button>
        <button onClick={() => navigate("/notes")}>Notes</button>
        <button onClick={() => navigate("/habits")}>Habits</button>
      </div>

      <div className="cards">
        <div className="card">
          <h2>Total Tasks</h2>
          <p>{totalTasks}</p>
        </div>

        <div className="card">
          <h2>Completed</h2>
          <p>{completedTasks}</p>
        </div>

        <div className="card">
          <h2>Pending</h2>
          <p>{pendingTasks}</p>
        </div>

        <div className="card">
          <h2>Habit Rate</h2>
          <p>{habitRate}%</p>
        </div>
      </div>

    </div>
  );
}