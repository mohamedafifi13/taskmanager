import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(
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
    }
  };
  return (
    <div className="App">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
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
          Sign Up
        </Button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
export default Signup;
