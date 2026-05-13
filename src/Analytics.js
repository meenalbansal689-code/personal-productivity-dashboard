import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Analytics() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const todo = tasks.filter(t => t.status === "todo").length;
  const progress = tasks.filter(t => t.status === "progress").length;
  const done = tasks.filter(
    t => t.status === "done" || t.completed
  ).length;

  const data = [
    { name: "Todo", value: todo },
    { name: "In Progress", value: progress },
    { name: "Done", value: done }
  ];

  return (
    <div className="analytics-container">
      <h2>📊 Task Analytics</h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}