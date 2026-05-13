import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalNotes: 0,
    totalHabits: 0,
    completedHabits: 0
  });

  useEffect(() => {

    const isAuth =
      localStorage.getItem("isAuthenticated") === "true";

    if (!isAuth) {
      navigate("/");
    }

  }, [navigate]);

  useEffect(() => {

    const kanban =
      JSON.parse(localStorage.getItem("kanban")) || {
        todo: [],
        inProgress: [],
        done: []
      };

    const totalTasks =
      kanban.todo.length +
      kanban.inProgress.length +
      kanban.done.length;

    const completedTasks =
      kanban.done.length;

    const pendingTasks =
      kanban.todo.length +
      kanban.inProgress.length;

    const notes =
      JSON.parse(localStorage.getItem("notes")) || [];

    const totalNotes =
      notes.length;

    const habits =
      JSON.parse(localStorage.getItem("habits")) || [];

    const totalHabits =
      habits.length;

    const completedHabits =
      habits.filter(
        (habit) => habit.completedToday
      ).length;

    setStats({
      totalTasks,
      completedTasks,
      pendingTasks,
      totalNotes,
      totalHabits,
      completedHabits
    });

  }, []);

  return (

    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1>Dashboard</h1>

          <p>
            Welcome back! Here's your productivity overview
          </p>

        </div>

      </div>

      <div className="nav-buttons">

        <button onClick={() => navigate("/tasks")}>
          📝 Tasks
        </button>

        <button onClick={() => navigate("/notes")}>
          📒 Notes
        </button>

        <button onClick={() => navigate("/habits")}>
          🔥 Habits
        </button>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Tasks</h3>
          <h2>{stats.totalTasks}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Completed Tasks</h3>
          <h2>{stats.completedTasks}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Pending Tasks</h3>
          <h2>{stats.pendingTasks}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Notes</h3>
          <h2>{stats.totalNotes}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Habits</h3>
          <h2>{stats.totalHabits}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Completed Habits</h3>
          <h2>{stats.completedHabits}</h2>
        </div>

      </div>

    </div>
  );
}