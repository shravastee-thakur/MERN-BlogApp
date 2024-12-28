import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        navigate("/login");
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
          // sx={{ ":hover": { boxShadow: "10px 10px 20px #ccc" } }}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            Register
          </Typography>
          <TextField
            onChange={handleChange}
            placeholder="Name"
            name="username"
            type="text"
            value={input.username}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            onChange={handleChange}
            placeholder="Email"
            name="email"
            type="email"
            value={input.email}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            onChange={handleChange}
            placeholder="Password"
            name="password"
            type="password"
            value={input.password}
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
            Submit
          </Button>
          <Button onClick={() => navigate("/login")} variant="h4">
            Already registered ? Please login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
