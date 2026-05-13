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

  const data = [
    {
      name: "Total Tasks",
      value: totalTasks
    },
    {
      name: "Completed Tasks",
      value: completedTasks
    },
    {
      name: "Pending Tasks",
      value: pendingTasks
    },
    {
      name: "Notes",
      value: totalNotes
    },
    {
      name: "Habits",
      value: totalHabits
    },
    {
      name: "Completed Habits",
      value: completedHabits
    }
  ];

  return (

    <div className="analytics-container">

      <h2> 📊 Productivity Analytics</h2>

      <div
        style={{
          width: "100%",
          height: 450
        }}
      >

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="value"
              fill="#4CAF50"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}