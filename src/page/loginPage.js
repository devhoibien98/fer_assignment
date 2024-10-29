// LoginPage.js
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Dummy Admin Credentials
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("🚀 ~ result:", result);
      const user = result.user;

      // Save user information as a regular user
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: "user",
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        })
      );
      console.log("User logged in:", user);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Save admin information to localStorage
      localStorage.setItem("user", JSON.stringify({ role: "admin", email }));
      console.log("Admin logged in");
      navigate("/orchid-management"); // Route to admin manager page
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2, mb: 2 }}
        >
          Login as Admin
        </Button>
        <Divider>or</Divider>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleGoogleLogin}
          sx={{ mt: 2, backgroundColor: "#DB4437" }}
        >
          Login with Google (User)
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
