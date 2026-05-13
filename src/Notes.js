import { useState, useEffect } from "react";
import "./Notes.css";

export default function Notes() {

  const [notes, setNotes] = useState([]);

  const [input, setInput] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {

    const stored =
      JSON.parse(localStorage.getItem("notes"));

    if (stored) {
      setNotes(stored);
    }

  }, []);

  const addNote = () => {

    if (!input.trim()) return;

    if (editId !== null) {

      const updated = notes.map((note) => {

        if (note.id === editId) {

          return {
            ...note,
            text: input
          };
        }

        return note;
      });

      setNotes(updated);

      localStorage.setItem(
        "notes",
        JSON.stringify(updated)
      );

      setEditId(null);

    } else {

      const updated = [
        ...notes,
        {
          id: Date.now(),
          text: input
        }
      ];

      setNotes(updated);

      localStorage.setItem(
        "notes",
        JSON.stringify(updated)
      );
    }

    setInput("");
  };

  const deleteNote = (id) => {

    const updated = notes.filter(
      (note) => note.id !== id
    );

    setNotes(updated);

    localStorage.setItem(
      "notes",
      JSON.stringify(updated)
    );
  };

  const editNote = (note) => {

    setInput(note.text);

    setEditId(note.id);
  };

  return (

    <div className="notes-container">

      <h1 className="notes-title">
        Notes
      </h1>

      <div className="notes-input-container">

        <input
          type="text"
          placeholder="Write a note..."
          className="notes-input"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNote();
            }
          }}
        />

        <button
          className="add-btn"
          onClick={addNote}
        >
          {editId !== null ? "Update" : "Add"}
        </button>

      </div>

      <div className="notes-list">

        {notes.map((note) => (

          <div
            className="note-card"
            key={note.id}
          >

            <div className="note-text">
              {note.text}
            </div>

            <div className="note-actions">

              <button
                className="edit-btn"
                onClick={() => editNote(note)}
              >
                ✏ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteNote(note.id)
                }
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}