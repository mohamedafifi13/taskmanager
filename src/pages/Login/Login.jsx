import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to hold error message
  const navigate = useNavigate();
  const noify = () => toast.error("Invalid email or password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password"); // Set error message
      noify();
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          type="email"
          name="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        />
        <TextField
          type="password"
          name="password"
          required
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ display: "flex", flexDirection: "column" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Render error message if present */}
        <Button
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
            borderRadius: "10px",
            width: "80%",
            fontSize: "1.5rem",
          }}
          type="submit"
        >
          Login
        </Button>
        <ToastContainer />
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
