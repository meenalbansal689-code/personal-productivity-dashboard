import { useState, useEffect } from "react";
import "./HabitTracker.css";

export default function HabitTracker() {

  const [habitInput, setHabitInput] = useState("");

  const [habits, setHabits] = useState([]);

  useEffect(() => {

    const savedHabits =
      JSON.parse(localStorage.getItem("habits")) || [];

    setHabits(savedHabits);

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "habits",
      JSON.stringify(habits)
    );

  }, [habits]);

  const addHabit = () => {

    if (!habitInput.trim()) return;

    const newHabit = {
      id: Date.now(),

      name: habitInput.trim(),

      streak: 0,

      lastCompleted: null,

      completedToday: false
    };

    setHabits((prev) => [
      ...prev,
      newHabit
    ]);

    setHabitInput("");
  };

  const completeHabit = (id) => {

    const today =
      new Date().toDateString();

    const yesterday = new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const yesterdayString =
      yesterday.toDateString();

    setHabits((prev) =>
      prev.map((habit) => {

        if (habit.id !== id) {
          return habit;
        }

        if (habit.lastCompleted === today) {
          return habit;
        }

        if (
          habit.lastCompleted === yesterdayString
        ) {
          return {
            ...habit,

            streak: habit.streak + 1,

            lastCompleted: today,

            completedToday: true
          };
        }

        return {
          ...habit,

          streak: 1,

          lastCompleted: today,

          completedToday: true
        };
      })
    );
  };

  const deleteHabit = (id) => {

    setHabits((prev) =>
      prev.filter(
        (habit) => habit.id !== id
      )
    );
  };

  return (

    <div className="habits-container">

      <h2 className="habits-title">
        🔥 Habit Tracker
      </h2>

      <div className="habit-form">

        <input
          type="text"

          placeholder="Enter new habit..."

          className="habit-input"

          value={habitInput}

          onChange={(e) =>
            setHabitInput(e.target.value)
          }

          onKeyDown={(e) =>
            e.key === "Enter" && addHabit()
          }
        />

        <button
          className="add-btn"
          onClick={addHabit}
        >
          + Add
        </button>

      </div>

      <div className="habit-list">

        {habits.length === 0 ? (

          <div className="empty-state">

            <h3>No habits yet</h3>

            <p>
              Start building your daily routine 🚀
            </p>

          </div>

        ) : (

          habits.map((habit) => (

            <div
              key={habit.id}
              className="habit-card"
            >

              <div className="habit-info">

                <h3>
                  {habit.name}
                </h3>

                <p>
                  🔥 Streak:
                  {" "}
                  <strong>
                    {habit.streak}
                  </strong>
                </p>

              </div>

              <div className="habit-actions">

                <button
                  className={
                    habit.lastCompleted ===
                    new Date().toDateString()
                      ? "done-btn completed"
                      : "done-btn"
                  }

                  onClick={() =>
                    completeHabit(habit.id)
                  }
                >

                  {habit.lastCompleted ===
                  new Date().toDateString()
                    ? "✔ Done Today"
                    : "Mark Done"}

                </button>

                <button
                  className="delete-btn"

                  onClick={() =>
                    deleteHabit(habit.id)
                  }
                >
                  ❌
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}