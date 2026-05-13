import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./AuthForm";
import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import Notes from "./Notes";
import HabitTracker from "./HabitTracker";
import Analytics from "./Analytics";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";
import Settings from "./Settings";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<AuthForm />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ flex: 1, marginLeft: "220px" }}>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="habits" element={<HabitTracker />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </div>

              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;