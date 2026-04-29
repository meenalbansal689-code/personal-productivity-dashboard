import { useState, useEffect } from "react";
import "./HabitTracker.css";

export default function HabitTracker() {
  const [habitInput, setHabitInput] = useState("");
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("habits")) || [];/*string to array*/
    setHabits(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits)); /*array to string*/
  }, [habits]);
  const addHabit = () => {
    if (!habitInput.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: habitInput,
      streak: 0,
      completedToday: false,
    };

    setHabits([...habits, newHabit]);
    setHabitInput("");
  };
  const completeHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: !h.completedToday,
              streak: h.completedToday ? h.streak - 1 : h.streak + 1,
            }
          : h
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));/*removes habit with matching id*/
  };

  return (
    <div className="habits-container">
      <h2>Habit Tracker</h2>

      <div className="habit-form">
        <input
          type="text"
          placeholder="Enter new habit..."
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}/*runs when user types*/
          onKeyDown={(e) => e.key === "Enter" && addHabit()}/*runs when a keyboard key is pressed*/
        />
        <button onClick={addHabit}>+ Add</button>
      </div>

      <div className="habit-list">
        {habits.length === 0 ? (
          <p>No habits yet</p>
        ) : (
          habits.map((h) => (
            <div key={h.id} className="habit-card">
              <div>
                <h3>{h.name}</h3>
                <p>🔥 Streak: {h.streak}</p>
              </div>

              <div className="habit-actions">
                <button onClick={() => completeHabit(h.id)}>
                  {h.completedToday ? "✔ Done" : "Mark Done"}
                </button>

                <button onClick={() => deleteHabit(h.id)}>❌</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}