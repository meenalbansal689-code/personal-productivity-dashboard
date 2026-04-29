import { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [username, setUsername] = useState("");

  const saveName = () => {
    localStorage.setItem("username", username);
    alert("Saved!");
  };

  const resetData = () => {
    localStorage.clear();
    alert("All data cleared!");
  };

  return (
    <div className="settings-container">
      <h2> Settings</h2>

      <input
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button className="save-btn" onClick={saveName}>
        Save Username
      </button>

      <button className="reset-btn" onClick={resetData}>
        Reset All Data
      </button>
    </div>
  );
}