import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import "./Sidebar.css";
import "./Dashboard.css";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // LOGIN
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Please fill email and password first");
      return;
    }

    if (
      form.email === "admin@gmail.com" &&
      form.password === "4321"
    ) {
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  // LOGOUT
  const logout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <button
            type="submit"
            disabled={
              !form.email.trim() ||
              !form.password.trim()
            }
          >
            {isLogin ? "Login" : "Signup"}
          </button>

        </form>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="toggle-text"
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}