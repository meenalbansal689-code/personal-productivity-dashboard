import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path; /*is current page equal to given path*/

  const handleLogout = () => { /*created logout function*/
    localStorage.removeItem("isAuthenticated");/*Deletes login data from browser storage*/
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">⚡ ProdDash</h2>

      <button
        className={isActive("/dashboard") ? "active" : ""} /*checks if current page is dashboard*/
        onClick={() => navigate("/dashboard")}
      >
        📊 Dashboard
      </button>

      <button
        className={isActive("/tasks") ? "active" : ""}
        onClick={() => navigate("/tasks")}
      >
        📝 Tasks
      </button>

      <button
        className={isActive("/notes") ? "active" : ""}
        onClick={() => navigate("/notes")}
      >
        📒 Notes
      </button>

      <button
        className={isActive("/habits") ? "active" : ""}
        onClick={() => navigate("/habits")}
      >
        💪 Habits
      </button>

      <button
        className={isActive("/analytics") ? "active" : ""}
        onClick={() => navigate("/analytics")}
      >
        📊 Analytics
      </button>

      <button
        className={isActive("/settings") ? "active" : ""}
        onClick={() => navigate("/settings")}
      >
        ⚙️ Settings
      </button>

      <button onClick={handleLogout}>
        🚪 Logout
      </button>

    </div>
  );
}