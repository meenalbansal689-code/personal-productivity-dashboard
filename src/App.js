import { Routes, Route } from "react-router-dom";

import AuthForm from "./AuthForm";
import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import Notes from "./Notes";
import HabitTracker from "./HabitTracker";
import Analytics from "./Analytics";
import Settings from "./Settings";
import NotFound from "./NotFound";

import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";

function App() {

return (
<Routes>

<Route path="/" element={<AuthForm />} />

<Route element={<ProtectedRoute />}>
  <Route element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/habits" element={<HabitTracker />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
  </Route>
</Route>

<Route path="*" element={<NotFound />} />

</Routes>
);

}

export default App;