import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/store.js";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            Login
          </Typography>

          <TextField
            onChange={handleChange}
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            onChange={handleChange}
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            margin="normal"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ marginTop: 3 }}
          >
            Login
          </Button>
          <Button onClick={() => navigate("/register")} variant="h4">
            Do not have an account? Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
