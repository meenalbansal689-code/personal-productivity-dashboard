import { useState, useEffect } from "react";
import "./Notes.css";

export default function Notes() {
  const [note, setNote] = useState("");/*text user type*/
  const [notes, setNotes] = useState([]);/*stores all notes*/
  const [editId, setEditId] = useState(null);
 
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = () => {
    if (note.trim() === "") return;

    if (editId) {
      setNotes(
        notes.map((n) =>
          n.id === editId ? { ...n, text: note } : n
        )
      );
      setEditId(null);
    } else {
      setNotes([...notes, { id: Date.now(), text: note }]);
    }

    setNote("");
  };

  const handleEdit = (n) => {
    setNote(n.text);
    setEditId(n.id);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="notes-container">
      <h1>Notes</h1>

      <input
        type="text"
        placeholder="Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="note-input"
      />

      <button onClick={handleSubmit} className="note-btn">
        {editId ? "Update" : "Add"}
      </button>

      <ul className="note-list">
        {notes.map((n) => (
          <li key={n.id} className="note-item">
            <span>{n.text}</span>

            <button 
  onClick={() => handleEdit(n)}
  className="edit-btn"
>
  ✏ Edit
</button>

<button 
  onClick={() => handleDelete(n.id)}
  className="delete-btn"
>
  🗑 Delete
</button>
          </li>
        ))}
      </ul>
    </div>
  );
}