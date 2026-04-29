import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import "./Sidebar.css";
import "./Dashboard.css";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);/*Creates a state variable called isLogin and a function setIsLogin to update it*/
  const [form, setForm] = useState({/*Creates state object for storing form inputs*/
    email: "",
    password: ""
  });

  const navigate = useNavigate(); /*Creates a variable navigate and stores the useNavigate() function in it*/

  const handleSubmit = (e) => { 
    e.preventDefault();

    if (
      form.email === "admin@gmail.com" &&
      form.password === "4321"/*here AND operator is used to check if both email and password are correct*/
    ) {
      localStorage.setItem("isAuthenticated", "true");/*to allow access*/
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
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
            onChange={(e) =>/*runs when user types*/
              setForm({ /*update form state*/
                ...form,/*copy existing data*/
                email: e.target.value/*updates email*/
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

          <button type="submit">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p
          onClick={() => setIsLogin(!isLogin)} /*()=> means run this function when clicked*/
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