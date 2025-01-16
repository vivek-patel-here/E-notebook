import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer } from "react-toastify";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setCredentials((prevCredentials) => {
      return { ...prevCredentials, [event.target.name]: [event.target.value] };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { email, password } = credentials;
    if (!email || !password) {
      return toast.error("All feilds are required!", {
        autoClose: 1500,
        position: "top-center",
      });
    }
    try {
      const response = await fetch("https://e-notebook-server.onrender.com/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${credentials.email}`,
          password: `${credentials.password}`,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        return toast.error(result.message, {
          autoClose: 1500,
          position: "top-center",
        });
      }

      localStorage.setItem("username", result.username);
      localStorage.setItem("email", result.email);
      localStorage.setItem("token", result.token);
      localStorage.setItem("id", result.id);

      setIsAuthenticated(true);

      toast.success(result.message, {
        autoClose: 1500,
        position: "top-center",
      });


      setTimeout(() => {
        navigate("/notes");
      }, 2000);
      
    } catch (err) {
      toast.error(err, {
        autoClose: 1500,
        position: "top-center",
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className="box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Log In</button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
    <ToastContainer autoClose={1500} />
    </div>
  );
}

export default Login;
