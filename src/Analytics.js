import "./Analytics.css";

export default function Analytics() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const completed = tasks.filter(
    t => t.completed || t.status === "done"
  ).length;

  const pending = tasks.length - completed;

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>

      <div className="analytics-cards">
        <div className="analytics-card total">
          <p>Total Tasks</p>
          <h3>{tasks.length}</h3>
        </div>

        <div className="analytics-card completed">
          <p>Completed</p>
          <h3>{completed}</h3>
        </div>

        <div className="analytics-card pending">
          <p>Pending</p>
          <h3>{pending}</h3>
        </div>
      </div>
    </div>
  );
}